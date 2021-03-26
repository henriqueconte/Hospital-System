from rest_framework.views import APIView
from rest_framework.response import Response

from core.models import Appointment
from core.serializers import AppointmentSerializer
from core.serializers import UserSerializer

from django.forms.models import model_to_dict


class AppointmentView(APIView):
    def get(self, request, patience):
        appointment_objects = Appointment.objects.filter(patience=patience)
        appointment_serializer = AppointmentSerializer(appointment_objects, many=True)
        return Response(appointment_serializer.data, status=201)


    def post(self, request):
        appointment_serializer = AppointmentSerializer(data=request.data)

        if appointment_serializer.is_valid():
            appointment_object = appointment_serializer.save()
            return Response(appointment_serializer.data, status=201)

        return Response(appointment_serializer.errors, status=400)

    def put(self, request, id=None):
        try:
            appointment_object = Appointment.objects.get(id=id)
        except Appointment.DoesNotExist:
            return Response({"errors": "This appointment does not exist."}, status=400)

        appointment_serializer = AppointmentSerializer(
            appointment_object, data=request.data
        )
        if appointment_serializer.is_valid():
            appointment_object = appointment_serializer.save()
            return Response(appointment_serializer.data, status=200)

        return Response(appointment_serializer.errors, status=400)

    def delete(self, request, id=None):
        try:
            appointment_object = Appointment.objects.get(id=id)
        except Appointment.DoesNotExist:
            return Response({"errors": "This appointment does not exist."}, status=400)

        appointment_object.delete()

        return Response(status=204)
