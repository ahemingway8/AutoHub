from django.db import models
from django.urls import reverse

class Technician(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    employee_id = models.CharField(max_length=50)

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

    def get_api_url(self):
        return reverse("api_automobile", kwargs={"vin": self.vin})

    class Meta:
        db_table = 'service_rest_automobilevo'

class Appointment(models.Model):
    date_time = models.DateTimeField
    reason = models.CharField(max_length=100)
    status = models.CharField(max_length=50)
    vin = models.CharField(max_length=50)
    customer = models.CharField(max_length=50)
    technician = models.ForeignKey(
        Technician, related_name="technician",
        on_delete=models.CASCADE,
    )
