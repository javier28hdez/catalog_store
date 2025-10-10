from django.db import models

class CategoryProductModel(models.Model):
    id_category_product = models.AutoField(primary_key=True, unique=True)
    category_name = models.CharField(max_length=150, unique=True, null=False, blank=False)
    description = models.TextField(unique=False, null=False, blank=True)

    def __str__(self):
        return self.name