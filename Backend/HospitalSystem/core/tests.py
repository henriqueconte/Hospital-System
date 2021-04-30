from django.test.client import Client
from django.test import TestCase

# Talvez você precise mudar essa variavel para o caminho
# do arquivo de dado para ../fake_data.json para funcionar
# fora do docker
FIXTURES = ["fake_data.json"]


class ReportsTestCase(TestCase):
    fixtures = FIXTURES

    def setUp(self):
        return super().setUp()

    def test_foobar(self):
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
