from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from store_app.models.CategoryBusinessModel import CategoryBusinessModel
from store_app.controllers.serializers.CategoryBusinessSerializer import CategoryBusinessSerializer

class CategoryBusinessView(APIView):
    def get(self, request):
        try:
            category_business = CategoryBusinessModel.objects.all()
            category_business_serializer = CategoryBusinessSerializer(category_business, many=True)

            if category_business_serializer is None:
                return Response(data={'response':'not exist'}, status=status.HTTP_404_NOT_FOUND)
            
            return Response(data=category_business_serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(data={'response':str(e)}, status=status.HTTP_400_BAD_REQUEST)
        

    def post(self, request):
        try:
            category_business = CategoryBusinessSerializer(data=request.data)

            if category_business.is_valid():
                category_business.save()
                return Response(data={'response':'Category business created successfully'}, status=status.HTTP_201_CREATED)
            
            return Response(data={'ValidationError':'Invalid request'}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response(data={'response':str(e)}, status=status.HTTP_400_BAD_REQUEST)

class CategoryBusinessViewDetail(APIView):
    def get(self, request, id):
        try:
            category_business = CategoryBusinessModel.objects.get(id_category=id)

            if category_business is None:
                return Response(data={'response':'the category business not exist'}, status=status.HTTP_400_BAD_REQUEST)

            category_business_serializer = CategoryBusinessSerializer(category_business)

            return Response(data=category_business_serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(data={'response':str(e)}, status=status.HTTP_400_BAD_REQUEST)   

    def put(self, request, id):
        try:
            category_business = CategoryBusinessModel.objects.get(id_category=id)

            if category_business is None:
                return Response(data={'response':'the category business not exist'}, status=status.HTTP_404_NOT_FOUND)
            
            category_business_serializer = CategoryBusinessSerializer(category_business, data=request.data)

            if category_business_serializer.is_valid():
                category_business_serializer.save()
                return Response(data={'response':'category business updated successfully'})
            
            return Response(data={'response':'invalid request'}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response(data={'response':str(e)}, status=status.HTTP_400_BAD_REQUEST)

        