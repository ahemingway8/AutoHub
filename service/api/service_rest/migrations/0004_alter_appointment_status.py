# Generated by Django 5.0.7 on 2025-01-27 10:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("service_rest", "0003_alter_appointment_date_time"),
    ]

    operations = [
        migrations.AlterField(
            model_name="appointment",
            name="status",
            field=models.CharField(default="created", max_length=50),
        ),
    ]
