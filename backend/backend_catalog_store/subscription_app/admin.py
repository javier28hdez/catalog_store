from django.contrib import admin
from .models.PaymentModel import PaymentModel
from .models.PlanModel import PlanModel
from .models.SubscriptionModel import SubscriptionModel

# Register your models here.
admin.site.register(PlanModel)
admin.site.register(PaymentModel)
admin.site.register(SubscriptionModel)