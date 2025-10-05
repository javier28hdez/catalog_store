from django.db import models

class PlanModel(models.Model):
    class Type(models.TextChoices):
        TEST = 'TE', 'Prueba Gratis'
        MONTHLY = 'MO', 'Mensual'
        ANNUAL = 'AN', 'Anual'
    
    id_plan = models.AutoField(primary_key=True, unique=True)
    name = models.CharField(max_length=100, unique=True, null=False, blank=False)
    description = models.TextField(unique=False, null=False, blank=False)
    price = models.DecimalField(max_digits=6, decimal_places=2) 
    type = models.CharField(max_length=3, choices=Type.choices)
    is_active = models.BooleanField(default=False)

    def __str__(self):
        return self.name
    
