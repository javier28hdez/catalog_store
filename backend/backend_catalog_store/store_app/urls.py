from django.urls import path
from store_app.controllers.views.BusinessView import BusinessView

urlpatterns = [
    path('business/', BusinessView.as_view(), name='business'),
]
