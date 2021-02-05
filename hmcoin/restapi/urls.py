from django.urls import include, path
from django.views.decorators.csrf import csrf_exempt  
from .restservice import get_open_transactions



urlpatterns = [ 
    path('get_open_transactions', get_open_transactions, name="all_transactions"),
]