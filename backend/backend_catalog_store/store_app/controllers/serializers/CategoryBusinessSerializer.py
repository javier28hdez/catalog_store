from rest_framework import serializers
from store_app.models.CategoryBusinessModel import CategoryBusinessModel

class CategoryBusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryBusinessModel
        fields = [
            'id_category',
            'id_business',
            'name',
            'description',
        ]
        read_only_fields = ['id_category']
    
    
