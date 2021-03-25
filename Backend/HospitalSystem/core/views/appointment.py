from rest_framework.views import APIView
from rest_framework.response import Response

from core.models import Appointment
from core.serializers import AppointmentSerializer
from core.serializers import DoctorSerializer
from core.serializers import UserSerializer

from django.forms.models import model_to_dict


class AppointmentView(APIView):
    def get(self, request, id):
        try:
            appointment_queryset = (
                Appointment.objects.select_related("doctor_id")
                .select_related("user_id")
                .get(id=id)
            )
            doctor_serializer = DoctorSerializer(appointment_queryset.doctor_id)
            user_serializer = UserSerializer(appointment_queryset.user_id)

        except Appointment.DoesNotExist:
            return Response({"errors": "This appointment does not exist."}, status=400)

        merged = model_to_dict(appointment_queryset)
        merged["doctor"] = doctor_serializer.data
        merged["user"] = user_serializer.data
        del merged["doctor_id"]
        del merged["user_id"]
        return Response(merged)

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
