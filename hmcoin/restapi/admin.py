from django.contrib import admin
from .models import Addressbook
from .models import Block
from .models import Blockchain
from .models import Transaction

admin.site.register(Addressbook)
admin.site.register(Blockchain)
admin.site.register(Block)
admin.site.register(Transaction)