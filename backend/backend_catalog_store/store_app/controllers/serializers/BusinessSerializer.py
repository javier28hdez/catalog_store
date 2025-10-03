from rest_framework import serializers
from store_app.models import BusinessModel

class BusinessSerializer(serializers.Serializer):
    class Meta:
        models = BusinessModel
        fields =[
            'name',
            'email_business',
            'address',
            'telephone',
            'description',
            'img_business',
        ]