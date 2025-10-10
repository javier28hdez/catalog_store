from django.db import models

class CategoryBusinessModel(models.Model):
    id_category_business = models.AutoField(primary_key=True, unique=True)
    id_business = models.ForeignKey(
        "BusinessModel",
        on_delete=models.CASCADE,
    )
    name = models.CharField(max_length=100, unique=True, null=False, blank=False)
    description = models.TextField(unique=False, null=False, blank=False) #puede que este de mas

    def __str__(self):
        return self.name
    
