from django.db import models
from .user import User


class Appointment(models.Model):
    doctor = models.ForeignKey(User, on_delete=models.CASCADE, related_name="doctor")
    patience = models.ForeignKey(User, on_delete=models.CASCADE, related_name="patience")
    start = models.DateTimeField(null=True, blank=True, db_index=True)
    end = models.DateTimeField(null=True, blank=True, db_index=True)
    extra_data = models.CharField(max_length=4096, null=True, blank=True)
    timestamp = models.DateTimeField(null=True, blank=True, db_index=True, auto_now_add=True)
    address = models.CharField(max_length=1000, null=True, blank=True)
