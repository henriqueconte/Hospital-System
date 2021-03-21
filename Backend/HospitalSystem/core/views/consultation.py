from rest_framework.views import APIView
from rest_framework.response import Response

from core.models import Consultation
from core.serializers import ConsultationSerializer
from core.serializers import DoctorSerializer
from core.serializers import UserSerializer

from django.forms.models import model_to_dict


class ConsultationView(APIView):
    def get(self, request, id):
        try:
            consultation_queryset = (
                Consultation.objects.select_related("doctor_id")
                .select_related("user_id")
                .get(id=id)
            )
            doctor_serializer = DoctorSerializer(consultation_queryset.doctor_id)
            user_serializer = UserSerializer(consultation_queryset.user_id)

        except Consultation.DoesNotExist:
            return Response({"errors": "This consultation does not exist."}, status=400)

        merged = model_to_dict(consultation_queryset)
        merged["doctor"] = doctor_serializer.data
        merged["user"] = user_serializer.data
        del merged["doctor_id"]
        del merged["user_id"]
        return Response(merged)

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
            return Response({"errors": "This consultation does not exist."}, status=400)

        consultation_serializer = ConsultationSerializer(
            consultation_object, data=request.data
        )
        if consultation_serializer.is_valid():
            consultation_object = consultation_serializer.save()
            return Response(consultation_serializer.data, status=200)

        return Response(consultation_serializer.errors, status=400)

    def delete(self, request, id=None):
        try:
            consultation_object = Consultation.objects.get(id=id)
        except Consultation.DoesNotExist:
            return Response({"errors": "This consultation does not exist."}, status=400)

        consultation_object.delete()

        return Response(status=204)
