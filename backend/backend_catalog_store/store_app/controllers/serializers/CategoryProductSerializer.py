from rest_framework import serializers
from store_app.models.CategoryProductModel import CategoryProductModel 

class CategoryProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryProductModel
        fields = [
            'id_category_product',
            'category_name',
            'description',
        ]
        fields_only_read=['id_category_product']