'''
transactions.
'''

class Transactions:
    
    def __init__(self, sender, recipient, quantity):
        self.sender = sender
        self.recipient = recipient
        self.quantity = quantity
        self.reward = 5 # todo: erstelle Konstante

    def get_sender(self):
        return self.sender

    def get_recipient(self):
        return self.recipient

    def get_quantity(self):
        return self.quantity