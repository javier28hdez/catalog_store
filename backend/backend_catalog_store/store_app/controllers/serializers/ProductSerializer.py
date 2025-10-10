from rest_framework import serializers
from store_app.models.ProductModel import ProductModel
from store_app.models.CategoryProductModel import CategoryProductModel
from store_app.controllers.serializers.CategoryProductSerializer import CategoryProductSerializer

class ProductSerializer(serializers.ModelSerializer):
    id_category_product = CategoryProductSerializer(read_only=True)

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

        def create(self, validated_data):
            category_data = validated_data.pop('id_category_product')
            product = ProductModel.objects.create(**validated_data)
            category = CategoryProductModel.objects.create(**category_data)

            return product
