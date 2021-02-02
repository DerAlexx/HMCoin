from django.contrib import admin
from django.urls import path
from django.urls import include

from restapi import urls as restapirouting

urlpatterns = [
    path('admin/', admin.site.urls),
    path("rest/", include(restapirouting)),
]
