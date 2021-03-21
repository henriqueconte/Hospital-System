from django.db import models
from .user import User
from .doctor import Doctor

class Consultation(models.Model):
    doctor_id = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    start = models.DateTimeField(null=False, blank=False, db_index=True)
    end = models.DateTimeField(null=False, blank=False, db_index=True)
    extra_data = models.CharField(max_length=4096, null=True, blank=False)
    timestamp = models.DateTimeField(null=False, blank=False, db_index=True,auto_now_add=True)
    