from django.db import models

class ProductModel(models.Model):

    class TypeTags(models.TextChoices):
        OFFER = 'OFR', 'Oferta'
        NEW =  'NEW', 'Nuevo'
        POPULAR = 'POP', 'Popular' 

    class TypeMoneda(models.TextChoices):
        NACIONAL = 'CUP', 'Moneda Nacional Cubana'
        DOLAR = 'MLC', 'Dolar Americano Transferencia'
        ZELL = 'ZEL', 'Dolar Americano'

    id_product = models.AutoField(primary_key=True, unique=True)
    id_business = models.ForeignKey(
        "BusinessModel",
        on_delete=models.CASCADE,
    )
    id_category_product = models.ForeignKey(
        "CategoryProductModel",
        on_delete=models.CASCADE,
    )
    name = models.CharField(max_length=150, unique=True, null=False, blank=False)
    description = models.TextField(unique=False, null=False, blank=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    stock = models.IntegerField()
    img_product = models.ImageField(upload_to='product/')
    is_available = models.BooleanField(default=True)
    created_at = models.DateField(auto_now_add=True)
    update_at = models.DateField(auto_now=True)
    tags = models.CharField(max_length=3, choices=TypeTags.choices)
    moneda = models.CharField(max_length=3, choices=TypeMoneda.choices)

    def __str__(self):
        return self.name