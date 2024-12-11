from django.db import models

# Create your models here.

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)


class Salesperson(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.PositiveIntegerField(unique=True)


class Customer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    address = models.TextField()


class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sales",
        on_delete=models.CASCADE,
    )
    salesperson = models.ForeignKey(
        Salesperson,
        related_name="sales",
        on_delete=models.CASCADE
    )
    customer = models.ForeignKey(
        Customer,
        related_name="sales",
        on_delete=models.CASCADE
    )
    price = models.DecimalField(max_digits=10, decimal_places=2)
