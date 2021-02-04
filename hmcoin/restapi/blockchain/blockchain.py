'''
Blockchainclass.
'''

from .transaction import TransactionObejct
from .block import BlockObejct

class BlockChainObject:
    
    def __init__(self):
        first_Block = Block.generate_genesis_block()
        self.chain = [first_Block]
        self.open_transactions = []

    def construct_block(self, proof_no, prev_hash):
        new_block = Block(index=(len(self.chain) + 1), proof=proof_no, previous_hash=prev_hash)
        self.chain.append(new_block)
        return new_block

    def add_transactions(self, transaction):
        self.open_transactions.append(transaction)


    def get_next_transaction(self):
        if len(self.open_transactions) > 0:
            return self.open_transactions[0]
        else:
            return None

    def last_block(self):
        return self.chain[-1]

    #@staticmethod
    #def proof_of_work(last_proof):
    #    pass

    @staticmethod
    def verifying_proof(last_proof, proof):
        pass

    @staticmethod
    def check_validity(block):
        '''
        check the validity of the given block
        Keyword arguments:
        block -- block is the Block-Object, whose validity gets tested  
        '''
