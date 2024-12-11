from django.shortcuts import render
import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Technician, AutomobileVO, Appointment

@require_http_methods(["GET", "POST"])
def list_tech(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            
        )
