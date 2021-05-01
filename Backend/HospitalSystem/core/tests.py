import json
from django.test.client import Client
from django.test import TestCase
from .expected import EXPECTED_APPOINTMENTS

from .models import Appointment
from .serializers import AppointmentSerializer

# Talvez você precise mudar essa variavel para o caminho
# do arquivo de dado para ../fake_data.json para funcionar
# fora do docker
FIXTURES = ["fake_data.json"]


# Um TestCase só porquê o setup demora infinito
class IntegrationTestCase(TestCase):
    fixtures = FIXTURES

    def setUp(self):
        return super().setUp()

    def test_reports_1(self):
        c = Client()
        response = c.get("/report/", data={"report_type": 1})
        self.assertEqual(
            response.json(),
            {
                "report_results": [
                    {"year": 2020, "yearly_count": 2},
                    {"year": 2021, "yearly_count": 14},
                ]
            },
        )

    def test_reports_2(self):
        c = Client()
        response = c.get("/report/", data={"report_type": "2", "year": 2021})
        self.assertEqual(
            {"report_results": [1, 0, 2, 0, 3, 1, 2, 2, 2, 0, 1, 0]}, response.json()
        )

    def test_reports_3(self):
        c = Client()
        response = c.get("/report/", data={"report_type": 3})
        self.assertEqual(
            response.json(),
            {
                "report_results": [
                    {"name": "Carlos Silva", "appointments_count": 6},
                    {"name": "Andrei Silva", "appointments_count": 3},
                    {"name": "Mariana Torres", "appointments_count": 2},
                    {"name": "Lilian Mattos", "appointments_count": 2},
                    {"name": "Diana Telles", "appointments_count": 1},
                    {"name": "Cecília Silveira", "appointments_count": 1},
                    {"name": "Marcelo Barros", "appointments_count": 1},
                ]
            },
        )

    def test_get_receptionist_appointments(self):
        c = Client()
        response = c.get("/appointment/")
        self.assertEquals(EXPECTED_APPOINTMENTS, response.json())

    def test_put_receptionist_appointments(self):
        c = Client()
        selected_appointment = EXPECTED_APPOINTMENTS[0]

        c.put(
            "/appointment/?appointment_id=1",
            data={
                "doctor": selected_appointment["doctor"]["id"],
                "patient": selected_appointment["patient"]["id"],
                "start": selected_appointment["start"],
                "end": selected_appointment["end"],
                "address": selected_appointment["address"],
                "extra_data": "",
                "status": "DONE",
                "prescription": selected_appointment["prescription"],
            },
            content_type="application/json",
        )

        expected = Appointment.objects.get(id=1)
        self.assertEqual(str(expected.status), "DONE")

    def test_get_doctor_appointments(self):
        c = Client()
        for i in range(0, 6):
            response = c.get(
                "/appointment/", data={"user_id": i, "user_type": "DOCTOR"}
            )
            doctor_appointments = [
                x for x in EXPECTED_APPOINTMENTS if x["doctor"]["id"] == i
            ]
            self.assertEquals(doctor_appointments, response.json())

    def test_cancel_doctor_appointments(self):
        c = Client()
        for i in range(0, 6):
            doctor_appointments = [
                x for x in EXPECTED_APPOINTMENTS if x["doctor"]["id"] == i
            ]
            for appointment in doctor_appointments:
                response = c.put(
                    f"/appointment/?appointment_id={appointment['id']}",
                    data={
                        "doctor": appointment["doctor"]["id"],
                        "patient": appointment["patient"]["id"],
                        "start": appointment["start"],
                        "end": appointment["end"],
                        "address": appointment["address"],
                        "extra_data": "",
                        "status": "CANCELLED",
                        "prescription": appointment["prescription"],
                    },
                    content_type="application/json",
                )
                expected = Appointment.objects.get(id=i)
                self.assertEqual(str(expected.status), "CANCELLED")
