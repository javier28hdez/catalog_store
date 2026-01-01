from rest_framework import serializers
from store_app.models.ProductModel import ProductModel
from store_app.models.CategoryProductModel import CategoryProductModel
from store_app.controllers.serializers.CategoryProductSerializer import CategoryProductSerializer

class ProductSerializer(serializers.ModelSerializer):
    category = CategoryProductSerializer(source='id_category_product', read_only=True)

    class Meta:
        model = ProductModel
        fields = [
            'id_product',
            'id_business',
            'name',
            'description',
            'price',
            'stock',
            'img_product',
            'is_available',
            'tags',
            'moneda',
            'category'
        ]
        read_only_fields = ['is_available', 'created_at', 'update_at']

class ProductPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductModel
        fields = [
            'id_product',
            'id_business',
            'name',
            'description',
            'price',
            'stock',
            'img_product',
            'is_available',
            'tags',
            'moneda',
            'id_category_product',
        ]
        read_only_fields = ['is_available', 'created_at', 'update_at']

class ProductToggleSerializar(serializers.ModelSerializer):
    class Meta:
        model = ProductModel
        fields = ['is_available']