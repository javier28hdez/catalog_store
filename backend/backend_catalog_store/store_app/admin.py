from django.contrib import admin
from .models.BusinessModel import BusinessModel
from .models.CategoryBusinessModel import CategoryBusinessModel
from .models.CategoryProductModel import CategoryProductModel
from .models.ProductModel import ProductModel

# Register your models here.
admin.site.register(BusinessModel)
admin.site.register(CategoryBusinessModel)
admin.site.register(ProductModel)
admin.site.register(CategoryProductModel)