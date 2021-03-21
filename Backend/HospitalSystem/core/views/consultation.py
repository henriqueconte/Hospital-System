from rest_framework.views import APIView
from rest_framework.response import Response

from core.models import Consultation
from core.serializers import ConsultationSerializer

class ConsultationView(APIView):

  def get(self, request, id):
    try:
        consultation_queryset = Consultation.objects.get(id=id)
        consultation_serializer = ConsultationSerializer(consultation_queryset)
    except Consultation.DoesNotExist:
        return Response({'errors': 'This consultation does not exist.'}, status=400)

    return Response(consultation_serializer.data)


  def post(self, request):
    consultation_serializer = ConsultationSerializer(data=request.data)

    if consultation_serializer.is_valid():
      consultation_object = consultation_serializer.save()
      return Response(consultation_serializer.data, status=201)

    return Response(consultation_serializer.errors, status=400)


  def put(self, request, id=None):
    try:
      consultation_object = Consultation.objects.get(id=id)
    except Consultation.DoesNotExist:
      return Response({'errors': 'This consultation does not exist.'}, status=400)

    consultation_serializer = ConsultationSerializer(consultation_object, data=request.data)
    if consultation_serializer.is_valid():
      consultation_object = consultation_serializer.save()
      return Response(consultation_serializer.data, status=200)

    return Response(consultation_serializer.errors, status=400)


  def delete(self, request, id=None):
    try:
      consultation_object = Consultation.objects.get(id=id)
    except Consultation.DoesNotExist:
      return Response({'errors': 'This consultation does not exist.'}, status=400)

    consultation_object.delete()

    return Response(status=204)
