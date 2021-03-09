from django.db import models

class User(models.Model):
    first_name = models.CharField(max_length=100, null=False, blank=False)
    last_name = models.CharField(max_length=100, null=False, blank=False)
    login = models.CharField(max_length=100, null=False, blank=False)
    password = models.CharField(max_length=100, null=False, blank=False)
