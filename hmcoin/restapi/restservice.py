import json
import hashlib
from time import time
import secrets

from rest_framework import status
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import api_view
from django.http import JsonResponse

from .models import *
from .serializers import *

TRANSACTION_IN_A_BLOCK = 8

def get_hash(block, transactions):
    index = block.index
    prev_hash = block.previous_hash
    timestamp = block.timestamp
    transactions = Transaction.objects.filter(block__index=index)
    serial_trans = TransactionSerializerHash(transactions, many=True)

    block_to_hash = "{}{}{}{}".format(index, prev_hash, timestamp, serial_trans.data.__str__)
    return hashlib.sha256(block_to_hash.encode()).hexdigest()

@api_view(['GET'])
def start_blockchain(request):
    try:
        blockchain = Blockchain.objects.filter(pk=1)

        if blockchain.count() > 0:
            Blockchain.objects.all().delete()

        new_blockchain = Blockchain(id=1)
        new_blockchain.save()

        # create genesis-block and connect with BC
        timest = time()
        genesis = Block(index=0, previous_hash="0", timestamp=timest, blockchain=new_blockchain)
        genesis.save()

        content = {'info': 'Blockchain reseted'}
        return JsonResponse(content, status=200)
    except Exception as error:
        ex = str(error)
        content = {'info': ex}
        return JsonResponse(content, status=500)


@api_view(['GET'])
def get_blockchain(request):
    try:
        blockchain = Blockchain.objects.filter(id=1)

        if blockchain.count() > 0:
            all_trans = Transaction.objects.all()

            serial = TransactionSerializer(all_trans, many=True)
            return JsonResponse(serial.data, status=200, safe=False)

        content = {'info': ' no blockchain in DB'}
        return JsonResponse(content, status=status.HTTP_400_BAD_REQUEST)
    except Exception as error:
        ex = str(error)
        content = {'info': ex}
        return JsonResponse(content, status=500)


'''
erwartet: {
    'sender' : string
    'recipient': string
    'quantity': int
}
'''
@api_view(['POST'])
def new_transaction(request):
    try:
        data = request.body
        data_dict = json.loads(data)

        sender = data_dict["sender"]
        recipient = data_dict["recipient"]
        quantity = data_dict["quantity"]

        # check if sender and recipient are in adressbook
        if quantity < 0:
            content = {'info': 'quantity less than zero'}
            return JsonResponse(content, status=status.HTTP_400_BAD_REQUEST)

        check = Addressbook.objects.filter(address=sender)
        if check.count() <= 0:
            content = {'info': 'sender wrong'}
            return JsonResponse(content, status=status.HTTP_400_BAD_REQUEST)

        check = Addressbook.objects.filter(address=recipient)
        if check.count() <= 0:
            content = {'info': 'recipient wrong'}
            return JsonResponse(content, status=status.HTTP_400_BAD_REQUEST)

        bc = Blockchain.objects.filter(id=1)

        if bc.count() > 0:
            proof = secrets.randbelow(200)
            new_trans = Transaction(sender=sender, recipient=recipient, quantity=quantity, reward=5, proof=proof)
            new_trans.open_transactions = bc.first()
            new_trans.save()

            content = {'info': 'ok'}
            return JsonResponse(content, status=200, safe=False)

        content = {'info': 'no Blockchain started'}
        return JsonResponse(content, status=status.HTTP_400_BAD_REQUEST)
    except Exception as error:
        ex = str(error)
        content = {'info': ex}
        return JsonResponse(content, status=500)


@api_view(['GET'])
def get_all_finished_transactions(request):
    try:
        fin_trans = Transaction.objects.filter(open_transactions=None)
        if fin_trans.count() > 0:
            serial = TransactionSerializer(fin_trans, many=True)
            return JsonResponse(serial.data, status=200, safe=False)

        content = {'info': 'no transactions found'}
        return JsonResponse(content, status=status.HTTP_400_BAD_REQUEST)
    except Exception as error:
        print(error)


@api_view(['GET'])
def get_open_transactions(request):
    try:
        all_open_trans = Transaction.objects.exclude(open_transactions=None)
        serial = TransactionSerializer(all_open_trans, many=True)

        return JsonResponse(serial.data, status=200, safe=False)
    except Exception as error:
        ex = str(error)
        content = {'info': ex}
        return JsonResponse(content, status=500)


@api_view(['GET'])
def mining(request):
    try:
        # get one transaction from open_transactions
        open_trans = Transaction.objects.exclude(open_transactions=None).first()

        if open_trans == None:
            content = {'info': 'no open Transactions left to mine'}
            return JsonResponse(content, status=status.HTTP_400_BAD_REQUEST)

        serial = TransactionSerializerHash(open_trans)
        return JsonResponse(serial.data, status=200, safe=False)
    except Exception as error:
        ex = str(error)
        content = {'info': ex}
        return JsonResponse(content, status=500)


'''
erwartet: {
    'block_index' : index,
}
'''
@api_view(['GET'])
def get_block(request):
    try:
        data = request.body
        data_dict = json.loads(data)

        #deserialize data, get id value
        block_idx = data_dict["block_index"]
        block = Block.objects.filter(index=block_idx)

        if block.count() > 0:
            serial = BlockSerializer(block)
            return JsonResponse(serial.data, status=200, safe=False)

        content = {'info': 'no block found'}
        return JsonResponse(content, status=status.HTTP_400_BAD_REQUEST)
    except Exception as error:
        ex = str(error)
        content = {'info': ex}
        return JsonResponse(content, status=500)


'''
erwartet: {
    'transaction_id': int,
    'runs': int
}
'''
@api_view(['POST'])
def verify(request):
    try:
        data = request.body
        data_dict = json.loads(data)
        # get transaction-data and found proof
        trans_id = data_dict["transaction_id"]
        nr_of_runs = data_dict["runs"]

        # check stuff. ggf trans_to_verify und last block nach hier oben ziehen
        trans_to_verify = Transaction.objects.get(id=trans_id)

        str_to_hash = str(trans_id + trans_to_verify.proof) + trans_to_verify.sender
        print(str_to_hash)
        for i in range(1, nr_of_runs+1):
            str_to_hash = hashlib.sha256(str_to_hash.encode()).hexdigest()
            print(str_to_hash)
        valid = str_to_hash[:2] == "11"

        if valid:
            
            if trans_to_verify is not None:
                last_block = Block.objects.order_by('index').first()
                trans = trans_to_verify

                # get nr of transactions in block
                last_block_transactions = Transaction.objects.filter(block__index=last_block.index)
                count_trans_in_block = last_block_transactions.count()
                if last_block.index != 0 and (count_trans_in_block is not None and count_trans_in_block < TRANSACTION_IN_A_BLOCK):
                    #add transaction to block
                    trans.block = last_block
                    trans.open_transactions = None
                    trans.proof = nr_of_runs
                    trans.save()

                    content = {'info': 'ok'}
                    return JsonResponse(content, status=200)

                #create block, as only genesis is there or transaction_max is reached
                #define hash func above
                prev_hash = get_hash(last_block, last_block_transactions)
                new_block = Block(index=(last_block.index + 1), previous_hash=prev_hash, timestamp=time(), blockchain=last_block.blockchain)
                new_block.save()

                trans.block = new_block
                trans.open_transactions = None
                trans.proof = nr_of_runs
                trans.save()

                content = {'info': 'ok'}
                return JsonResponse(content, status=200)

            else:
                content = {'info': 'no transaction found'}
                return JsonResponse(content, status=status.HTTP_400_BAD_REQUEST)
        else:
            content = {'info': 'was not valid'}
            return JsonResponse(content, status=status.HTTP_400_BAD_REQUEST)
    except Exception as error:
        ex = str(error)
        content = {'info': ex}
        return JsonResponse(content, status=500)


'''
erwartet: {
    'address': string
}
'''
@api_view(['POST'])
def add_address(request):
    try:
        data = request.body
        data_dict = json.loads(data)

        # get address from data
        address_from_data = data_dict["address"]

        hashed_addr = hashlib.sha256( (address_from_data + str(time())).encode() ).hexdigest()

        adr = Addressbook(address=hashed_addr)
        adr.save()

        content = {"info":"Address added", "address": hashed_addr}
        return JsonResponse(content, status=200)
    except Exception as error:
        ex = str(error)
        content = {'info': ex}
        return JsonResponse(content, status=500)


@api_view(['GET'])
def get_addresses(request):
    try:
        addresses = Addressbook.objects.all()
        serial = AddressSerializer(addresses, many=True)
        return JsonResponse(serial.data, status=200, safe=False)
    except Exception as error:
        ex = str(error)
        print(ex)
        content = {'info': ex}
        return JsonResponse(content, status=500)
