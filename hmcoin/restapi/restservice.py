from .models import *
from .serializers import *
from rest_framework import response, status
from rest_framework.renderers import JSONRenderer
import json

import hashlib
from time import time

TRANSACTION_IN_A_BLOCK = 8

def get_hash(block, transactions):
    index = block.index
    proof = block.proof
    prev_hash = block.previous_hash
    timestamp = block.timestamp
    transactions = Transaction.objects.filter(block__index=index)
    serial_trans = TransactionSerializer(transactions, many=True)

    
    block_to_hash = "{}{}{}{}{}".format(index, proof, prev_hash, timestamp, serial_trans.data.__str__)
    return hashlib.sha256(block_to_hash.encode()).hexdigest()


def start_blockchain(request):
    blockchain = Blockchain.objects.filter(pk=1)

    if blockchain.count() > 0:
        blockchain.delete()
    
    new_blockchain = Blockchain(id=1)
    new_blockchain.save()

    # create genesis-block and connect with BC
    time = time.time()
    genesis = Block(index=0, proof=0, previous_hash="0", timestamp = time, blockchain=new_blockchain)
    genesis.save()


    serial = BlockchainSerializer(new_blockchain)
    content = JSONRenderer().render(serial.data)
    return response.Response(content)


def get_blockchain(request):
    blockchain = Blockchain.filter(pk=1)

    if blockchain.count() > 0:
        all_trans = Transaction.objects.all()

        serial = TransactionSerializer(all_trans, many=True)
        content = JSONRenderer().render(serial.data)
        return response.Response(content)
        
    else:
        content = {'info': ' no blockchain in DB'}
        return response.Response(content, status=status.HTTP_204_NO_CONTENT)

'''
erwartet: {
    'sender' : string
    'recipient': string
    'quantity': int
}
'''
def new_transaction(request):
    data = request.body
    data_dict = json.loads(data)

    sender = data_dict["sender"]
    recipient = data_dict["recipient"]
    quantity = data_dict["quantity"]

    # check if sender and recipient are in adressbook
    if quantity < 0:
        content = {'info': 'quantity less than zero'}
        return response.Response(content, status=status.HTTP_204_NO_CONTENT)

    check = Addressbook.objects.filter(address=sender)
    if check.count() <= 0:
        content = {'info': 'sender wrong'}
        return response.Response(content, status=status.HTTP_204_NO_CONTENT)

    check = Addressbook.objects.filter(address=recipient)
    if check.count() <= 0:
        content = {'info': 'recipient wrong'}
        return response.Response(content, status=status.HTTP_204_NO_CONTENT)

    bc = Blockchain.objects.filter(pk=1)

    if bc.count() > 0:
        new_trans = Transaction(sender=sender, recipient=recipient, quantity=quantity, reward=5)
        new_trans.open_transactions = bc
        new_trans.save()

        serial = TransactionSerializer(new_trans)
        content = JSONRenderer().render(serial.data)
        return response.Response(content)

    else:
        content = {'info': 'no Blockchain started'}
        return response.Response(content, status=status.HTTP_204_NO_CONTENT)

    
def get_all_finished_transactions(request):
    fin_trans = Transaction.objects.filter(open_transactions=None)

    if fin_trans.count() > 0:
        serial = TransactionSerializer(fin_trans, many=True)
        content = JSONRenderer().render(serial.data)
        return response.Response(content)
    else:
        content = {'info': 'no transactions found'}
        return response.Response(content, status=status.HTTP_204_NO_CONTENT)



def get_open_transactions(request):
    all_open_trans = Transaction.objects.exclude(open_transactions=None)
    serial = TransactionSerializer(all_open_trans, many=True)
    content = JSONRenderer().render(serial.data)

    return response.Response(content)


def mining(request):
    # get one transaction from open_transactions
    open_trans = Transaction.objects.exclude(open_transactions=None).first()
    
    if open_trans == None:
        content = {'info': 'no open Transactions left to mine'}
        return response.Response(content, status=status.HTTP_204_NO_CONTENT)
    else:
        serial = TransactionSerializer(open_trans)
        content = JSONRenderer().render(serial.data)
        return response.Response(content)

'''
erwartet: {
    'block_index' : index,
}
'''
def get_block(request):
    data = request.body
    data_dict = json.loads(data)

    #deserialize data, get id value
    block_idx = data_dict["block_index"]

    block = Block.objects.filter(index=block_idx)

    if block.count() > 0:
        serial = BlockSerializer(block)
        content = JSONRenderer().render(serial.data)
        return response.Response(content)
    else:
        content = {'info': 'no block found'}
        return response.Response(content, status=status.HTTP_204_NO_CONTENT)


'''
erwartet: {
    'sender' : string,
    'recipient': string,
    'quantity': int,
    'reward': int,
    'proof': int
}
'''
def verify(request):
    data = request.body
    data_dict = json.loads(data)
    # get transaction-data and found proof
    sender = data_dict["sender"]
    recipient = data_dict["recipient"]
    quantity = data_dict["quantity"]
    reward = data_dict["reward"]
    proof = data_dict["proof"]

    # check stuff. ggf trans_to_verify und last block nach hier oben ziehen
    valid = True
    
    if (valid):
        trans_to_verify = Transaction.objects.filter(sender=sender, recipient=recipient, quantity=quantity, reward=reward)
        if trans_to_verify.count() > 0:
            last_block = Block.objects.order_by('index').first()
            trans = trans_to_verify.first()

            # get nr of transactions in block
            last_block_transactions = Transaction.objects.filter(block__index=last_block.index)
            count_trans_in_block = last_block_transactions.count()
            if last_block.index != 0 and (count_trans_in_block != None or count_trans_in_block < TRANSACTION_IN_A_BLOCK):
                #add transaction to block
                trans.block = last_block
                trans.open_transactions = None
                trans.save()

                content = {'info': 'ok'}
                return response.Response(content)

            else:
                #create block, as only genesis is there or transaction_max is reached
                #define hash func above
                prev_hash = get_hash(last_block, last_block_transactions) 
                new_block = Block(index=(last_block.index + 1), proof=proof, previous_hash=prev_hash, timestamp=time.time(), blockchain=last_block.blockchain)
                new_block.save()

                trans.block = new_block
                trans.open_transactions = None
                trans.save()

                content = {'info': 'ok'}
                return response.Response(content)

        else:
            content = {'info': 'no transaction found'}
            return response.Response(content, status=status.HTTP_204_NO_CONTENT)
    else:
        content = {'info': 'was not valid'}
        return response.Response(content, status=status.HTTP_204_NO_CONTENT)


'''
erwartet: {
    'address': string
}
'''
def add_address(request):
    data = request.body
    data_dict = json.loads(data)

    # get address from data
    address_from_data = data_dict["address"]

    adr = Addressbook(address=address_from_data)
    adr.save()

    content = {"info":"Address added"}
    return response.Response(content)


def get_addresses(request):
    addresses = Addressbook.objects.all()
    serial = AddressSerializer(addresses, many=True)
    content = JSONRenderer().render(serial.data)

    return response.Response(content)
