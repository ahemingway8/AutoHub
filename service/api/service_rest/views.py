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
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician, encoder=TechnicianEncoder,
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
            return JsonResponse({"message": "Technician Deleted!"})
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Technician Does Not Exist"}, status=404)

@require_http_methods(["GET", "POST"])
def appointments(request):
    if request.method == "GET":
        vin_search = request.GET.get('vin')
        if vin_search:
            appointments = Appointment.objects.filter(vin=vin_search)
        else:
            appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder, safe=False,
        )
    elif request.method == "POST":
        try:
            content = json.loads(request.body)
            print(content)

            technician_id = content.get('technician')
            print(technician_id)

            if not technician_id:
                return JsonResponse({"message": "Technician ID is required"}, status=400)

            technician = Technician.objects.get(id=content['technician'])

            appointment = Appointment.objects.create(
                vin=content['vin'],
                customer=content['customer'],
                date_time=content['date_time'],
                technician=technician,
                reason=content['reason'],
                status=content.get('status', 'created')
                )

            vip_status(appointment)
            print("status check")

            return JsonResponse(
                {"appointment": appointment}, encoder=AppointmentEncoder,
                safe=False,
            )

        except Technician.DoesNotExist:
            return JsonResponse({"message": "Technician Does Not Exist"}, status=404)
        except Exception as e:
            return JsonResponse({"message": str(e)}, status=400)

@require_http_methods(["DELETE"])
def appointment(request, id):
    if request.method == "DELETE":
        try:
            appointment = Appointment.objects.get(id=id)
            appointment.delete()
            return JsonResponse({"message": "Appointment Deleted!"},
            )
        except Appointment.DoesNotExist:
            return JsonResponse({"MESSAGE": "Appointment Does Not Exist"}, status=404)

def vip_status(appointment):
    if AutomobileVO.objects.filter(vin=appointment.vin).exists():
        appointment.vip = True
        appointment.save()

def update_finish(request):
    if request.method == "PUT":
        appointments = Appointment.objects.filter(status='finished')
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
        )

def update_cancel(request):
    if request.method == "PUT":
        appointments = Appointment.objects.filter(status='canceled')
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
        )
