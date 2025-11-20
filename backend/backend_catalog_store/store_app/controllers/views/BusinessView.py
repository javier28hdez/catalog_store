from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from store_app.controllers.serializers.BusinessSerializer import BusinessSerializer
from store_app.models.BusinessModel import BusinessModel


class BusinessView(APIView):
    #Mostrar todo los negocios
    def get(self, request):
        try:
            business = BusinessModel.objects.all()
            business_serializer = BusinessSerializer(business, many=True)

        except Exception as e:
            return Response(data={'response':str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(data=business_serializer.data, status=status.HTTP_200_OK)
    
    #Crear un negocio
    def post(self, request):
        try:
            business_deserializer = BusinessSerializer(data=request.data)
            if business_deserializer.is_valid():
                business_deserializer.save()
                return Response(data={'data':business_deserializer.data, 'message':'Business created successfully'}, status=status.HTTP_201_CREATED)
            
            return Response(data={'ValidationError':business_deserializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response(data={'Exception':str(e)}, status=status.HTTP_400_BAD_REQUEST)

class BusinessViewDetail(APIView):
    def get(self, request, id):
        try:
            business = BusinessModel.objects.get(id_business=id)

            if business is None:
                return Response(data={'response':'the business not exist'}, status=status.HTTP_400_BAD_REQUEST)

            business_serializer = BusinessSerializer(business)

            return Response(data=business_serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(data={'response':str(e)}, status=status.HTTP_400_BAD_REQUEST)  
    
    def put(self, request, id):
        try:
            business = BusinessModel.objects.get(id_business=id)

            if business is None:
                return Response(data={'response':'Sorry you business not exist'}, status=status.HTTP_404_NOT_FOUND)

            business_serializer = BusinessSerializer(business, data=request.data)    

            if business_serializer.is_valid():
                business_serializer.save()
                return Response(data={'response':'Business update successfully'}, status=status.HTTP_200_OK)
            
            return Response(data={'ValidationError':business_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response(data={'response':str(e)}, status=status.HTTP_400_BAD_REQUEST)
        


