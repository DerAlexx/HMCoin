from rest_framework import serializers
from .models import *

class BlockchainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blockchain
        fields = ['id']


class BlockSerializer(serializers.ModelSerializer):
    blockchain = BlockchainSerializer()
    class Meta:
        model = Block
        fields = ['index', 'proof', 'previous_hash', 'timestamp']


class TransactionSerializer(serializers.ModelSerializer):
    #block = BlockSerializer()
    #open_transactions = BlockchainSerializer()
    
    class Meta:
        model = Transaction
        #fields = ['sender', 'recipient', 'quantity', 'reward', 'block', 'open_transactions']
        fields = ['sender', 'recipient', 'quantity']

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Addressbook
        fields = ['address']