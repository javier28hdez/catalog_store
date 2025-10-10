from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from store_app.models.CategoryProductModel import CategoryProductModel
from store_app.models.BusinessModel import BusinessModel
from store_app.controllers.serializers.CategoryProductSerializer import CategoryProductSerializer

class CategoryProductListByBusinessView(APIView):
    #Devuelve la lista de categorias de productos de un negocio 
    def get(self, request, id_business):
        try:
            BusinessModel.objects.get(id_business=id_business)

        except Exception as e:
            return Response(data={'response':'business nos found or nos exist'}, status=status.HTTP_404_NOT_FOUND)

        try:
            category_product = CategoryProductModel.objects.filter(products__id_business=id_business).distinct()

            category_product_serializer = CategoryProductSerializer(category_product, many=True)

            if category_product_serializer is None:
                return Response(data={'response':'not exist'}, status=status.HTTP_404_NOT_FOUND)
            
            return Response(data=category_product_serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(data={'response':str(e)}, status=status.HTTP_400_BAD_REQUEST)

class CategoryProductPostView(APIView):
    #Crea una categoria de un producto
    def post(self, request):
        try:
            category_product = CategoryProductSerializer(data=request.data)

            if category_product.is_valid():
                category_product.save()
                return Response(data={'response':'Category product created successfully'}, status=status.HTTP_201_CREATED)

            return Response(data={'ValidationError':'Invalid request'}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response(data={'response':str(e)}, status=status.HTTP_400_BAD_REQUEST)

class CategoryProductViewDetail(APIView):
    #Muestra una categoria de un producto 
    def get(self, request, id):
        try:
            category_product = CategoryProductModel.objects.get(id_category_product=id)

            if category_product is None:
                return Response(data={'response':'the category product not exist'}, status=status.HTTP_400_BAD_REQUEST)

            category_product_serializer = CategoryProductSerializer(category_product)

            return Response(data=category_product_serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(data={'response':str(e)}, status=status.HTTP_400_BAD_REQUEST)   
    #actualiza una categoria de un producto
    def put(self, request, id):
        try:
            category_product = CategoryProductModel.objects.get(id_category_product=id)

            if category_product is None:
                return Response(data={'response':'the category product not exist'}, status=status.HTTP_404_NOT_FOUND)
            
            category_product_serializer = CategoryProductSerializer(category_product, data=request.data)

            if category_product_serializer.is_valid():
                category_product_serializer.save()
                return Response(data={'response':'category product updated successfully'})
            
            return Response(data={'response':'invalid request'}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response(data={'response':str(e)}, status=status.HTTP_400_BAD_REQUEST)

        