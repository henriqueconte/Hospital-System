from django.db import models


class User(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    login = models.CharField(max_length=100, null=False, blank=False)
    password = models.CharField(max_length=100, null=False, blank=False)
    birth_date = models.DateField(null=True, blank=True)

    MALE = "MALE"
    FEMALE = "FEMALE"
    OTHER = "OTHER"

    GENDER_CHOICES = (
        (MALE, "male"),
        (FEMALE, "female"),
        (OTHER, "other"),
    )
    gender = models.CharField(max_length=9, choices=GENDER_CHOICES, null=True, blank=True)

    RECEPTIONIST = "RECEPTIONIST"
    DOCTOR = "DOCTOR"
    PATIENCE = "PATIENCE"

    USER_TYPE_CHOICES = (
        (RECEPTIONIST, "receptionist"),
        (DOCTOR, "doctor"),
        (PATIENCE, "patience"),
    )
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES, null=True, blank=True)
