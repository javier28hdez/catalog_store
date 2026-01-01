from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from user_app.serializer import RegistrationAccountSerializer
from django.contrib.auth import authenticate


@api_view(['POST'])
def register_view(request):
    if request.method == 'POST':
        serializer = RegistrationAccountSerializer(data=request.data)
        data={}

        if serializer.is_valid():
        
            account = serializer.save()
            data['response'] = 'Ha creado con éxito su cuenta'
            data['username'] = account.username
            refresh = RefreshToken.for_user(account)

            data['token'] = {
                'refresh': str(refresh),
                'access': str(refresh.access_token)
            }

            return Response(data=data, status=status.HTTP_201_CREATED)
    
        else:
            data=serializer.errors
            return Response(data=data, status=status.HTTP_400_BAD_REQUEST)

    return Response(
        {'error': 'Método no permitido'}, 
        status=status.HTTP_405_METHOD_NOT_ALLOWED
    )

@api_view(['POST'])
def login_view(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response(data={'error':'El usuario y la contraseña son requeridos'}, status=status.HTTP_400_BAD_REQUEST)

        account = authenticate(username=username, password=password)

        if account is not None:

            refresh = RefreshToken.for_user(account)
            data = {
                'response': 'Usuario logueado exitosamente',
                'username': account.username,
                'token': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token)
                }
            }
            return Response(data=data, status=status.HTTP_200_OK)

        else:
            return Response(data={'error':'Credenciales incorrectas'}, status=status.HTTP_401_UNAUTHORIZED)
        
    return Response(data={'error':'Método no permitido'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['POST'])
def logout_view(request):
    if request.method == 'POST':
        refresh_token = request.data.get('refresh')
        if not refresh_token:
            return Response(data={'error':'El token de refresco es requerido'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            refresh = RefreshToken(refresh_token)
            refresh.blacklist()
            return Response(data={'response':'Ha cerrado sesión exitosamente'}, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response(data={'error':'Error al cerrar sesión'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response(data={'error':'Método no permitido'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)    







