from django.urls import include, path
from django.views.decorators.csrf import csrf_exempt

from .restservice import get_all_finished_transactions
from .restservice import get_open_transactions
from .restservice import add_address
from .restservice import get_addresses
from .restservice import get_block #unused
from .restservice import get_blockchain
from .restservice import start_blockchain
from .restservice import verify
from .restservice import mining
from .restservice import new_transaction

urlpatterns = [ 
    path('done-transactions/', get_all_finished_transactions, name="done-transactions"),
    path('open-transactions/', get_open_transactions, name="open-transactions"),
    path('open-transactions/', new_transaction, name="open-transactions"),
    path('get-address/', get_addresses, name="get-address"),
    path('new-address/', add_address, name="new-address"),
    path('mining/', mining, name="mining"),
    path('verfiy/', verify, name="verify"),
    path('blockchain/', get_blockchain, name="get_blockchain"),
    path('reset/', start_blockchain, name="reset"),
]