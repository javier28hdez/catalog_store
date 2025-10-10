from django.urls import path, include

from store_app.controllers.views.BusinessView import BusinessView, BusinessViewDetail
from store_app.controllers.views.CategoryBusinessView import CategoryBusinessView, CategoryBusinessViewDetail
from store_app.controllers.views.CategoryProductView import CategoryProductListByBusinessView, CategoryProductPostView, CategoryProductViewDetail
from store_app.controllers.views.ProductView import ProductView, ProductViewDetail

urlpatterns = [
    #Negocios
    path('', BusinessView.as_view(), name='business'),
    path('<int:id>/', BusinessViewDetail.as_view(), name='business-detail'),

    #Categorias del negocio
    path('category/', CategoryBusinessView.as_view(), name='category-business'),
    path('category/<int:id>/', CategoryBusinessViewDetail.as_view(), name='category-business-detail'),

    #Productos
    path('<int:id_business>/product/', ProductView.as_view(), name='product'),
    path('product/<int:id>/', ProductViewDetail.as_view(), name='product-detail'),


    #Categorias de los productos
    path('<int:id_business>/product/category/', CategoryProductListByBusinessView.as_view(), name='category-product-by-business'),
    path('product/category/', CategoryProductPostView.as_view(), name='category-product'),
    path('product/category/<int:id>/', CategoryProductViewDetail.as_view(), name='category-product-detail'),

]
