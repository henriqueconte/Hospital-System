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

    def test_cancel_appointments(self):
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

    def test_add_doctor_prescription(self):
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
                        "status": appointment["status"],
                        "prescription": f"Teste doctor",
                    },
                    content_type="application/json",
                )
                expected = Appointment.objects.get(id=i)
                self.assertEqual(str(expected.prescription), f"Teste doctor")

    def test_login_ok(self):
        c = Client()
        response = c.get(
            "/login/?user_login=suelen_fagundes@gmail.com&user_password=sue123",
        ).json()

        self.assertEqual(response["login"], "suelen_fagundes@gmail.com")
        self.assertEqual(response["user_type"], "RECEPTIONIST")

    def test_login_failure(self):
        c = Client()
        response = c.get(
            "/login/?user_login=suelen_fagundes@gmail.com&user_password=adasdsad"
        )
        self.assertEqual(400, response.status_code)

    def test_get_user_appointments(self):
        c = Client()
        for i in range(8, 18):
            response = c.get(
                "/appointment/", data={"user_id": i, "user_type": "PATIENT"}
            )
            appointments = [x for x in EXPECTED_APPOINTMENTS if x["patient"]["id"] == i]
            self.assertEquals(appointments, response.json())

    def test_get_doctor_requests(self):
        c = Client()
        specialties = [
            "CARDIOLOGIST",
            "OPHTHALMOLOGIST",
            "DERMATOLOGIST",
            "ONCOLOGIST",
            "PEDITRICIAN",
        ]
        expected = []
        for specialty in specialties:
            response = c.get("/doctors/", data={"specialty": specialty})
            expected.append(response.json())

        self.assertEqual(
            expected,
            [
                [
                    {
                        "id": 1,
                        "name": "Andrei Silva",
                        "login": "andrei_silva@gmail.com",
                        "password": "andrei123",
                        "birth_date": "1978-11-02",
                        "gender": "MALE",
                        "user_type": "DOCTOR",
                        "doctor_specialty": "CARDIOLOGIST",
                    },
                    {
                        "id": 6,
                        "name": "Cecília Silveira",
                        "login": "cecilia_silveira@gmail.com",
                        "password": "ceci123",
                        "birth_date": "1989-11-02",
                        "gender": "FEMALE",
                        "user_type": "DOCTOR",
                        "doctor_specialty": "CARDIOLOGIST",
                    },
                ],
                [],
                [
                    {
                        "id": 5,
                        "name": "Lilian Mattos",
                        "login": "lilian_mattos@gmail.com",
                        "password": "lili123",
                        "birth_date": "1978-11-02",
                        "gender": "FEMALE",
                        "user_type": "DOCTOR",
                        "doctor_specialty": "DERMATOLOGIST",
                    }
                ],
                [
                    {
                        "id": 4,
                        "name": "Diana Telles",
                        "login": "diana_telles@gmail.com",
                        "password": "diana123",
                        "birth_date": "1986-11-02",
                        "gender": "FEMALE",
                        "user_type": "DOCTOR",
                        "doctor_specialty": "ONCOLOGIST",
                    }
                ],
                [],
            ],
        )

    def test_schedule_appointment(self):
        c = Client()
        c.post(
            "/appointment/",
            data={
                "doctor": 1,
                "patient": 10,
                "start": "2018-11-20T15:58:44.767594-06:00",
                "end": "2018-11-20T15:58:44.767594-06:00",
                "address": "Av. Soledade, 619",
                "extra_data": "",
                "status": "ACTIVE",
                "prescription": "",
            },
            content_type="application/json",
        )
        new = Appointment.objects.filter(id=17).get()
        self.assertEqual(1, new.doctor.id)
        self.assertEqual(1, new.patient.id)
