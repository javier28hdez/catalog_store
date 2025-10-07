from django.urls import path
from store_app.controllers.views.BusinessView import BusinessView, BusinessViewDetail
from store_app.controllers.views.CategoryBusinessView import CategoryBusinessView, CategoryBusinessViewDetail

urlpatterns = [
    #Negocios
    path('business/', BusinessView.as_view(), name='business'),
    path('business/<int:id>/', BusinessViewDetail.as_view(), name='business-detail'),

    #Categorias del negocio
    path('business/category/', CategoryBusinessView.as_view(), name='category-business'),
    path('business/category/<int:id>/', CategoryBusinessViewDetail.as_view(), name='category-business-detail'),

]
