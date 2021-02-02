from django.urls import include, path
from django.views.decorators.csrf import csrf_exempt  
from .restservice import transactions



urlpatterns = [ 
    path('transactions', transactions, name="all_transactions"),
]