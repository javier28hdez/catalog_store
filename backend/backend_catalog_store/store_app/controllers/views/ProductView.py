from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from store_app.models.ProductModel import ProductModel
from store_app.controllers.serializers.ProductSerializer import ProductSerializer, ProductPostSerializer, ProductToggleSerializar


class ProductView(APIView):
    #Mostrar todos los productos de un negocio dado el id de un negocio
    def get(self, request, id_business):
        try:
            products = ProductModel.objects.filter(id_business=id_business).select_related('id_category_product').exclude(is_available=False)

            products_serializer = ProductSerializer(products, many=True)

            if products_serializer.data is None:
                return Response(data={'response':'not exist products on this business'}, status=status.HTTP_404_NOT_FOUND)

            return Response(data=products_serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response(data={'response':str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    #Crear un producto con su Categoria
    def post(self, request, id_business):
        try:
            request.data['id_business'] = id_business
            print(request.data)
            product_deserializer = ProductPostSerializer(data=request.data)
            

            if product_deserializer.is_valid():
                product_deserializer.save()
                return Response(data={'response':'success:product has been created'}, status=status.HTTP_201_CREATED)
            
            return Response(data={'response':'Validation errors'}, status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            return Response(data={'response':str(e)}, status=status.HTTP_400_BAD_REQUEST)

    
class ProductViewDetail(APIView):
    #Muestra un producto dado su id
    def get(self, request, id):
        try:
            product = ProductModel.objects.get(id_product=id)
            product_serializer = ProductSerializer(product)

            if product_serializer.data is None:
                return Response(data={'response':'not exist this products on this business'}, status=status.HTTP_404_NOT_FOUND)

            return Response(data=product_serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(data={'response':str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    #Modificar un producto dado su id
    def put(self, request, id):
        try:
            product = ProductModel.objects.get(id_product=id)

            if product is None:
                return Response(data={'response':'the product not exist in this business'}, status=status.HTTP_404_NOT_FOUND)

            product_serializer = ProductPostSerializer(product,data=request.data)

            if product_serializer.is_valid():
                product_serializer.save()
                return Response(data={'response':'the product has been successfully added'}, status=status.HTTP_200_OK)
            
            print("ERRORES:", product_serializer.errors)
            
            return Response(data={'response':'Validation errors'}, status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            return Response(data={'response':str(e)}, status=status.HTTP_400_BAD_REQUEST)

class ProductToggleActiveView(APIView):
    def put(self, request, id):
        try:
            product = ProductModel.objects.get(id_product=id)
            if product is None:
                return Response(data={'response':'product not found'}, status=status.HTTP_404_NOT_FOUND)
            
            product.is_available = not product.is_available
            product.save()
            serializer = ProductToggleSerializar(product)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(data={'response':str(e)}, status=status.HTTP_400_BAD_REQUEST)