from django.shortcuts import render
import json
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from .models import Technician, AutomobileVO, Appointment
from .encoders import TechnicianEncoder, AppointmentEncoder

@require_http_methods(["GET", "POST"])
def technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
             encoder=TechnicianEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            technicians = Technician.objects.create(**content)
            return JsonResponse(
                technicians, encoder=TechnicianEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not submit technician"}
            )
            response.status_code = 400
            return response

def technician(request, id):
    if request.method == "DELETE":
        try:
            technician = Technician.objects.get(id=id)
            technician.delete()
            return JsonResponse({"message": "Technician Deleted!"},
                technician, encoder=TechnicianEncoder, safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Technician Does Not Exist"}, status=404)

@require_http_methods(["GET", "POST"]) #DO SERVICE HISTORY WITH GET IF CAN
def appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            appointment = Appointment.objects.create(**content)
            return JsonResponse(
                appointment, encoder=AppointmentEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            return JsonResponse({"message": "Appointment Does Not Exist"}, satus=404)

def appointment(request, id):
    if request.method == "DELETE":
        try:
            appointment = Appointment.objects.get(id=id)
            appointment.delete()
            return JsonResponse({"message": "Appointment Deleted!"}, appointment,encoder=AppointmentEncoder, safe=False,
            )
        except Appointment.DoesNotExist:
            return JsonResponse({"MESSAGE": "Appointment Does Not Exist"}, status=404)

# def appointment_cancel(request):
# def appointment_finish(request):
