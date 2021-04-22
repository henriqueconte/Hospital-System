from rest_framework import serializers

from core.models import Appointment
from .user import UserSerializer

class AppointmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Appointment
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        print(instance.doctor)
        print(instance.patient)
        response['doctor'] = UserSerializer(instance.doctor).data
        response['patient'] = UserSerializer(instance.patient).data
        return response
