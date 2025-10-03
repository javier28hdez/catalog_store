from django.db import models

class BusinessModel(models.Model):
    id_business = models.BigAutoField(primary_key=True, unique=True)
    name = models.CharField(max_length=100, unique=True, null=False, blank=False)
    email_business = models.EmailField(max_length=254)
    address = models.CharField(max_length=255, unique=False, null=False, blank=False)
    telephone = models.IntegerField(max_length=8)
    description = models.TextField(unique=False, null=False, blank=False)
    img_business = models.ImageField(upload_to='/business')  #imagen del negocio
    created_at = models.DateField(auto_now_add=True)
    update_at = models.DateField(auto_now=True )


    def __str__(self):
        return self.name
