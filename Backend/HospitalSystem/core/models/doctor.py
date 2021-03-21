from django.db import models

class Doctor(models.Model):
    first_name = models.CharField(max_length=100, null=False, blank=False)
    last_name = models.CharField(max_length=100, null=False, blank=False)
    specialty = models.CharField(max_length=100, null=False, blank=False)
    