from rest_framework.views import APIView
from rest_framework.response import Response

from core.models import Doctor
from core.serializers import DoctorSerializer

class DoctorView(APIView):

  def get(self, request, id):
    try:
        doctor_queryset = Doctor.objects.get(id=id)
        doctor_serializer = DoctorSerializer(doctor_queryset)
    except Doctor.DoesNotExist:
        return Response({'errors': 'This doctor does not exist.'}, status=400)

    return Response(doctor_serializer.data)


  def post(self, request):
    doctor_serializer = DoctorSerializer(data=request.data)

    if doctor_serializer.is_valid():
      doctor_object = doctor_serializer.save()
      return Response(doctor_serializer.data, status=201)

    return Response(doctor_serializer.errors, status=400)


  def put(self, request, id=None):
    try:
      doctor_object = Doctor.objects.get(id=id)
    except Doctor.DoesNotExist:
      return Response({'errors': 'This doctor does not exist.'}, status=400)

    doctor_serializer = DoctorSerializer(doctor_object, data=request.data)
    if doctor_serializer.is_valid():
      doctor_object = doctor_serializer.save()
      return Response(doctor_serializer.data, status=200)

    return Response(doctor_serializer.errors, status=400)


  def delete(self, request, id=None):
    try:
      doctor_object = Doctor.objects.get(id=id)
    except Doctor.DoesNotExist:
      return Response({'errors': 'This doctor does not exist.'}, status=400)

    doctor_object.delete()

    return Response(status=204)
