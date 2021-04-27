import datetime
import calendar

from rest_framework.views import APIView
from rest_framework.response import Response

from django.db.models import Count
from django.db.models.functions import ExtractYear

from core.models import Appointment, User
from core.serializers import AppointmentSerializer
from core.serializers import UserSerializer

NUMBER_OF_MONTHS = 12

class ReportView(APIView):
    class ReportType:
        APPOINTMENTS_PER_YEAR = '1'
        APPOINTMENTS_PER_MONTH = '2'
        MOST_REQUESTED_DOCTORS = '3'

    def get_appointments_per_year(self):
        result = Appointment.objects.filter(start__isnull=False).annotate(year=ExtractYear('start')).values('year').annotate(yearly_count=Count('year')).order_by()
        return result

    def get_most_requested_doctors(self):
        result = User.objects.values('name').filter(doctor__isnull=False).annotate(appointments_count=Count('id')).order_by('-appointments_count')
        return result

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


    def get_report_results(self, report_type, year=None):
        if report_type == self.ReportType.APPOINTMENTS_PER_YEAR:
            return self.get_appointments_per_year()
        elif report_type == self.ReportType.APPOINTMENTS_PER_MONTH:
            return self.get_appointments_per_month(year)
        elif report_type == self.ReportType.MOST_REQUESTED_DOCTORS:
            return self.get_most_requested_doctors()
        else:
            print("Request errado, sua BESTA", report_type)

    def get(self, request):
        """
        filters
            - report_type - APPOINTMENTS_PER_YEAR, APPOINTMENTS_PER_MONTH, MOST_REQUESTED_DOCTORS
            - year
        """
        report_type = self.request.query_params.get('report_type', None)
        year = self.request.query_params.get('year', None)
        if year is not None and year.isnumeric():
            year = int(year)

        report_results = self.get_report_results(report_type, year)

        data = {
            "report_results": report_results
        }
        return Response(data, status=201)
