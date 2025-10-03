from django.contrib import admin
from .models import PlanModel, PaymentModel, SubscriptionModel

# Register your models here.
admin.site.register(PlanModel)
admin.site.register(PaymentModel)
admin.site.register(SubscriptionModel)