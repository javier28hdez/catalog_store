from django.core.validators import MinLengthValidator, RegexValidator
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class AccountManager(BaseUserManager):
    def create_user(self, first_name, last_name, username, email, telephone, ci, password=None):

        if not first_name and not last_name and not telephone and not ci:
            raise ValueError('El usuario debe ingresar sus datos personales')

        if not username:
            raise ValueError('El usuario debe tener username')

        if not email:
            raise ValueError('El usuario debe tener email')

        user = self.model(
            first_name = first_name,
            last_name = last_name,
            username = username,
            email = self.normalize_email(email),
            telephone = telephone,
            ci = ci,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, first_name, last_name, username, email, telephone, ci, password):

        user = self.create_user(
            first_name = first_name,
            last_name = last_name,
            username = username,
            password=password,
            email = self.normalize_email(email),
            telephone = telephone,
            ci = ci,
        )

        user.is_active=True
        user.is_client=True
        user.is_staff = True
        user.is_admin=True
        user.superadmin=True
        user.save(using=self._db)
        return user


class AccountModel(AbstractBaseUser):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    username = models.CharField(max_length=50, unique=True) 
    email = models.EmailField(max_length=100, unique=True)
    telephone = models.CharField(
        max_length=8,
        validators=[
            MinLengthValidator(8),  # Valida longitud mínima
            # Opcional: validar que sean solo números
            RegexValidator(r'^\d+$', 'Solo se permiten números')
        ])
    ci = models.CharField(
        max_length=11,
        validators=[
            MinLengthValidator(11),  # Valida longitud mínima
            # Opcional: validar que sean solo números
            RegexValidator(r'^\d+$', 'Solo se permiten números')
        ])
    
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_client = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_superadmin = models.BooleanField(default=False)

    objects = AccountManager()
    
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'email', 'telephone', 'ci']

    def full_name(self):
        return f'{self.first_name} {self.last_name}'

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return self.is_admin
    
    def has_module_perms(self, add_label):
        return True