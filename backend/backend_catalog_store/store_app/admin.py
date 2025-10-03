from django.contrib import admin
from .models import BusinessModel, CategoryBusinessModel, ProductModel, CategoryProductModel

# Register your models here.
admin.site.register(BusinessModel)
admin.site.register(CategoryProductModel)
admin.site.register(ProductModel)
admin.site.register(CategoryProductModel)