from django.urls import path
from .views import technicians, technician, appointments, appointment


urlpatterns = [
    path("technicians/", technicians, name="technicians"),
    path("technicians/<int:id>/", technician, name="technician"),
    path('appointments/', appointments, name="appointments"),
    path('appointments/<int:id>/', appointment, name="appointment"),
]
