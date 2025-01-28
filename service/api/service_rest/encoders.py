from common.json import ModelEncoder
from .models import AutomobileVO, Technician, Appointment

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id",
    ]

class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "date_time",
        "reason",
        "status",
        "vin",
        "customer",
        "id",
        "vip",
        "technician",
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }
