# Generated by Django 5.0.7 on 2025-01-27 10:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("service_rest", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="appointment",
            name="date_time",
            field=models.DateTimeField(null=True),
        ),
    ]
