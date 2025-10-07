from django.db import models

class PaymentModel(models.Model):
    class TypeStatus(models.TextChoices):
        PENDING = 'PEN', "Pendiente"
        SUCCES = 'SEC', "Realizado con exito"
        ERROR = 'ERR', "Error en el pago"

    class TypePaymentMethod(models.TextChoices):
        TRANSFER = 'TRA', "Transferencia"
        CASH = 'CAS', "Efectivo"
        TRANSFER_FOREIGN = 'TRF', "Transferencia desde el extranjero"

    id_payment = models.AutoField(primary_key=True, unique=True)
    status = models.CharField(max_length=3, choices=TypeStatus.choices) 
    payment_method = models.CharField(max_length=3, choices=TypePaymentMethod.choices)
    created_at = models.DateField(auto_now=True)
    completed_at = models.DateField()

    def __str__(self):
        return self.payment_method[1]