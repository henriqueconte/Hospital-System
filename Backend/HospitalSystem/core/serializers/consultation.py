from rest_framework import serializers

from core.models import Consultation

class ConsultationSerializer(serializers.ModelSerializer):

  class Meta:
    model = Consultation
    fields = '__all__'
