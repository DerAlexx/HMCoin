from django.db import models

# erhalte obj bei one-to-many-relation. bsp one block-> many transactions: 
# Transactions.objects.get(Block_id=ID).transactions


class Blockchain(models.Model):
    id = models.AutoField(primary_key=True)

    def __str__(self):
        return str(self.id)

class Block(models.Model):
    index = models.IntegerField()
    previous_hash = models.CharField(max_length=250)
    timestamp = models.IntegerField()
    blockchain = models.ForeignKey(Blockchain, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.index) + ", prev_hash: " + self.previous_hash + ", timestamp: " + str(self.timestamp)

class Transaction(models.Model):
    sender = models.CharField(max_length=250)
    recipient = models.CharField(max_length=250)
    quantity = models.FloatField()
    reward = models.IntegerField()
    proof = models.IntegerField(null=True)
    block = models.ForeignKey(Block, on_delete=models.CASCADE, null=True, blank=True)
    open_transactions = models.ForeignKey(Blockchain, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.sender + ' -> ' + self.recipient + ': ' + str(self.quantity)
    

class Addressbook(models.Model):
    address = models.CharField(max_length=250)

    def __str__(self):
        return str(self.address)
