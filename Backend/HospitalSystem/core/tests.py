from django.test.client import Client
from django.test import TestCase

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
        response = c.get("/report/?report_type=1")
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
        response = c.get("/report/?report_type=2&year=2021")
        self.assertEqual(
            {"report_results": [1, 0, 2, 0, 3, 1, 2, 2, 2, 0, 1, 0]}, response.json()
        )

    def test_reports_3(self):
        c = Client()
        response = c.get("/report/?report_type=3")
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
