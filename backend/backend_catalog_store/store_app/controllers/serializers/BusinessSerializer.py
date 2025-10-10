from rest_framework import serializers
from store_app.models.BusinessModel import BusinessModel
from store_app.controllers.serializers.CategoryBusinessSerializer import CategoryBusinessSerializer

class BusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessModel
        fields =[
            'name',
            'email_business',
            'address',
            'telephone',
            'description',
            'img_business',
            'created_at',
            'update_at',
        ]
        read_only_fields = ['id_business', 'created_at', 'update_at']
