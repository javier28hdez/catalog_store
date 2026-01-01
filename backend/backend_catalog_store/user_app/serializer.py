from rest_framework import serializers
from user_app.models import AccountModel

class RegistrationAccountSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model=AccountModel
        fields=['first_name', 'last_name', 'username', 'email', 'telephone', 'ci', 'password', 'confirm_password']
        extra_kwargs = {
            'password' : {'write_only':True}
        }

    def save(self):
        password = self.validated_data['password']
        confirm_password = self.validated_data['confirm_password']

        if password != confirm_password:
            raise serializers.ValidationError("Las contraseñas son diferentes")

        if AccountModel.objects.filter(email=self.validated_data['email']).exists():
            raise serializers.ValidationError("El correo ingresado ya se encuentra registrado")

        if AccountModel.objects.filter(username=self.validated_data['username']).exists():
            raise serializers.ValidationError("El nombre de ususario ingresado ya se encuentra registrado")

        account = AccountModel.objects.create_user(
            first_name=self.validated_data['first_name'],
            last_name=self.validated_data['last_name'],
            email=self.validated_data['email'],
            username=self.validated_data['username'],
            telephone=self.validated_data['telephone'],
            ci=self.validated_data['ci'],
            password=self.validated_data['password']
        )
        account.set_password(self.validated_data['password'])
        account.save()
        return account