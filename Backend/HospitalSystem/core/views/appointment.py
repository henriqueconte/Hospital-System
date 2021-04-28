from rest_framework.views import APIView
from rest_framework.response import Response

from core.models import Appointment, User
from core.serializers import AppointmentSerializer
from core.serializers import UserSerializer

from django.forms.models import model_to_dict


class AppointmentView(APIView):

    def get_appointment_objects(self, user_type, user_id, appointment_status):
        if user_type == User.DOCTOR:
            appointment_objects = Appointment.objects.filter(
                doctor=user_id)

        elif user_type == User.PATIENT:
            appointment_objects = Appointment.objects.filter(
                patient=user_id)

        else:
            appointment_objects = Appointment.objects.filter()

        if appointment_status:
            appointment_objects = appointment_objects.filter(
                status=appointment_status)

        return appointment_objects

    def get(self, request):
        """
        filters
            - user_type - RECEPTIONIST, DOCTOR, PATIENT
            - user_id
            - appointment_status - CANCELLED, ACTIVE, DONE
        """
        user_type = self.request.query_params.get('user_type', 'RECEPTIONIST')
        user_id = self.request.query_params.get('user_id', None)
        appointment_status = self.request.query_params.get(
            'appointment_status', None)

        appointment_objects = self.get_appointment_objects(
            user_type, user_id, appointment_status)

        appointment_serializer = AppointmentSerializer(
            appointment_objects, many=True)
        return Response(appointment_serializer.data, status=201)

    def post(self, request):
        appointment_serializer = AppointmentSerializer(data=request.data)

        if appointment_serializer.is_valid():
            appointment_object = appointment_serializer.save()
            return Response(appointment_serializer.data, status=201)

        return Response(appointment_serializer.errors, status=400)

    def put(self, request):
        user_id = self.request.query_params.get('appointment_id', None)
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
