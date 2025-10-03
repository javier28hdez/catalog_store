from django.db import models
import uuid

class SubscriptionModel(models.Model):

    class TypeStatus(models.TextChoices):
        PENDING = 'PEN', "Pendiente"
        CANCELED = 'CAN', "Cancelada"
        ACTIVE = 'ACT', "Activa"
        DEFEATED = 'DEF', "Vencida"

    id_subscription = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    id_plan = models.ForeignKey(
        "PlanModel",
        on_delete=models.CASCADE,
    )
    id_payment = models.ForeignKey(
        "PaymentModel",
        on_delete=models.CASCADE,
    )
    status = models.CharField(max_length=3, choices=TypeStatus.choices)
   
    start_date = models.DateField(auto_now_add=True)
    end_date = models.DateField() #Ver como hace que se pongan en dependencia del type que escoja

    def __str__(self):
        return self.status
