'''
Blockclass.
'''

import hashlib
from time import time

class BlockObejct:
    
    def __init__(self, index, proof, prev_hash):
        self.index = index
        self.proof = proof
        self.previous_hash = prev_hash
        self.timestamp = time.time()
        self.transactions = []

    def generate_genesis_block(self):
        self.index = 0
        self.proof = 0
        self.previous_hash = 0
        self.timestamp = time.time()
        self.transactions = []

    def calculate_hash(self):
        block_to_hash = "{}{}{}{}{}".format(self.index, self.proof, self.previous_hash, self.timestamp, self.transactions)
        return hashlib.sha256(block_to_hash.encode()).hexdigest()
        
    def get_index(self):
        return self.index

    def get_proof(self):
        return self.proof

    def get_previous_hash(self):
        return self.previous_hash

    def get_timestamp(self):
        return self.timestamp

    def get_transactions(self):
        return self.transactions