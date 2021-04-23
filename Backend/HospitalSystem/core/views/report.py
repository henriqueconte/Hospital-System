import datetime
import calendar

from rest_framework.views import APIView
from rest_framework.response import Response

from core.models import Appointment, User
from core.serializers import AppointmentSerializer
from core.serializers import UserSerializer

NUMBER_OF_MONTHS = 12


class ReportView(APIView):

    def get_appointments_per_month(self, year):
        appointments_per_month = []

        for i in range(1, NUMBER_OF_MONTHS + 1):
            last_day = calendar.monthrange(year, i)[1]
            month_first_date = datetime.datetime(year, i, 1)
            month_last_date = datetime.datetime(year, i, last_day)

            appointments_this_month = (Appointment.objects.filter(
                start__range=(month_first_date, month_last_date))).count()
            appointments_per_month.append(appointments_this_month)

        return appointments_per_month

    def get(self, request, year):
        appointments_per_month = self.get_appointments_per_month(year)
        data = {
            "appointments_per_month": appointments_per_month
        }
        return Response(data, status=201)
