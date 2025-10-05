from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from store_app.controllers.serializers.BusinessSerializer import BusinessSerializer
from store_app.models.BusinessModel import BusinessModel


class BusinessView(APIView):
    def get(self, request):
        try:
            business = BusinessModel.objects.all()
            business_serializer = BusinessSerializer(data=business, many=True)

        except Exception as e:
            return Response(data={'response':str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(data=business_serializer, status=status.HTTP_200_OK)
    
    def post(self, request):
        try:
            business_deserializer = BusinessSerializer(data=request.data)

            if business_deserializer.is_valid():
                business_deserializer.save()
                return Response(data={'data':business_deserializer.data, 'message':'Business created successfully'}, status=status.HTTP_201_CREATED)
            
            return Response(data={'ValidationError':business_deserializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response(data={'Exception':str(e)}, status=status.HTTP_400_BAD_REQUEST)
