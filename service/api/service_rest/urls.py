from django.urls import path
from .views import technicians, technician, appointments, appointment, update_finish, update_cancel


urlpatterns = [
    path("technicians/", technicians, name="technicians"),
    path("technicians/<int:id>/", technician, name="technician"),
    path('appointments/', appointments, name="appointments"),
    path('appointments/<int:id>/', appointment, name="appointment"),
    path('appointments/<int:id>/finish/', update_finish, name="finish_appointment"),
    path('appointments/<int:id>/cancel/', update_cancel, name="cancel_appointment"),
]
