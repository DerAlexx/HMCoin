from .blockchain.block import BlockObejct
from .blockchain.blockchain import BlockChainObject
from .blockchain.transaction import TransactionObejct
from .models import *
from .serializers import *
from rest_framework import response, status
from django.core.serializers import deserialize



def start_blockchain(request):
    blockchain = Blockchain.objects.filter(pk=1)

    if blockchain.count() > 0:
        blockchain.delete()
    
    new_blockchain = Blockchain(id=1)
    new_blockchain.save()

    serial = BlockchainSerializer(new_blockchain)
    
    return response.Response(serial.data)


def get_blockchain(request):
    blockchain = Blockchain.filter(pk=1)

    if blockchain.count() > 0:
        all_trans = Transaction.objects.all()

        serial = TransactionSerializer(all_trans)
        return response.Response(serial.data)
        
    else:
        content = {'info': ' no blockchain in DB'}
        return response.Response(content, status=status.HTTP_404_NOT_FOUND)



def new_transaction(request):
    data = request.data

    #deserialize data, get all transaction values
    sender = None
    recipient = None
    quantity = None

    # check if sender and recipient are in adressbook
    if quantity < 0:
        content = {'info': 'quantity less than zero'}
        return response.Response(content, status=status.HTTP_404_NOT_FOUND)

    check = Addressbook.objects.filter(address=sender)
    if check.count() <= 0:
        content = {'info': 'sender wrong'}
        return response.Response(content, status=status.HTTP_404_NOT_FOUND)

    check = Addressbook.objects.filter(address=recipient)
    if check.count() <= 0:
        content = {'info': 'recipient wrong'}
        return response.Response(content, status=status.HTTP_404_NOT_FOUND)

    bc = Blockchain.objects.filter(pk=1)

    if bc.count() > 0:
        new_trans = Transaction(sender=sender, recipient=recipient, quantity=quantity, reward=5)
        new_trans.open_transactions = bc
        new_trans.save()

        serial = TransactionSerializer(new_trans)
        return response.Response(serial.data)

    else:
        content = {'info': 'no Blockchain started'}
        return response.Response(content, status=status.HTTP_404_NOT_FOUND)

    



def get_open_transactions(request):
    all_open_trans = Transaction.objects.exclude(open_transactions=None).filter(open_transactions__isnull=False)
    serial = TransactionSerializer(all_open_trans)

    return response.Response(serial.data)


def mining(request):
    pass

def get_block(request):
    data = request.data

    #deserialize data, get id value
    block_id = None

    block = Block.objects.filter(pk=block_id)

    if block.count() > 0:
        serial = BlockSerializer(block)
        return response.Response(serial.data)
    else:
        content = {'info': 'nothing'}
        return response.Response(content, status=status.HTTP_404_NOT_FOUND)


def verify(request):
    pass


def addAddress(request):
    data = request.data

    # get address from data
    address_from_data = None

    adr = Addressbook(address=address_from_data)
    adr.save()

    content = {"ok":"ok"}
    return response.Response(content)


