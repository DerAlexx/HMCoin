from django.urls import include, path
from django.views.decorators.csrf import csrf_exempt  
from .restservice import get_all_finished_transactions



urlpatterns = [ 
    path('dtrans/', get_all_finished_transactions, name="all_transactions"),
]