'''
Blockchainclass.
'''

from .transaction import Transactions
from .block import Block

class BlockChain:
    
    def __init__(self):
        self.chain = []
        self.open_transactions = []
        pass

    def construct_block(self, proof_no, prev_hash):
        pass

    def add_transactions(self, transaction):
        pass

    def last_block(self):
        return self.chain[-1]

    #@staticmethod
    #def proof_of_work(last_proof):
    #    pass

    @staticmethod
    def verifying_proof(last_proof, proof):
        pass

    @staticmethod
    def check_validity():
        '''
        text
        Keyword arguments:
        name -- text 
        '''
        pass
