from django.db import models
from .user import User


class Appointment(models.Model):
    doctor = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="doctor")
    patient = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="patient")
    start = models.DateTimeField(null=True, blank=True, db_index=True)
    end = models.DateTimeField(null=True, blank=True, db_index=True)
    extra_data = models.CharField(max_length=4096, null=True, blank=True)
    timestamp = models.DateTimeField(
        null=True, blank=True, db_index=True, auto_now_add=True)
    address = models.CharField(max_length=1000, null=True, blank=True)

    CANCELLED = "CANCELLED"
    ACTIVE = "ACTIVE"
    DONE = "DONE"

    STATUS_CHOICES = (
        (CANCELLED, "cancelled"),
        (ACTIVE, "active"),
        (DONE, "done"),
    )
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default=ACTIVE)

    prescription = models.CharField(max_length=3000, null=True, blank=True)
