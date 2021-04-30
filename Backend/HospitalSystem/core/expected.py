EXPECTED_APPOINTMENTS = [
    {
        "id": 1,
        "start": "2021-05-25T15:30:00Z",
        "end": "2021-05-25T16:00:00Z",
        "extra_data": "",
        "timestamp": "2021-03-25T15:45:00Z",
        "address": "Rua Salvador 123",
        "status": "ACTIVE",
        "prescription": None,
        "doctor": {
            "id": 1,
            "name": "Andrei Silva",
            "login": "andrei_silva@gmail.com",
            "password": "andrei123",
            "birth_date": "1978-11-02",
            "gender": "MALE",
            "user_type": "DOCTOR",
            "doctor_specialty": "CARDIOLOGIST",
        },
        "patient": {
            "id": 8,
            "name": "Marcos Santos",
            "login": "marcos_santos@gmail.com",
            "password": "marc123",
            "birth_date": "1977-11-04",
            "gender": "MALE",
            "user_type": "PATIENT",
            "doctor_specialty": None,
        },
    },
    {
        "id": 2,
        "start": "2021-06-20T15:30:00Z",
        "end": "2021-06-20T16:00:00Z",
        "extra_data": "",
        "timestamp": "2021-03-25T15:45:00Z",
        "address": "Rua Saantos 123",
        "status": "ACTIVE",
        "prescription": None,
        "doctor": {
            "id": 2,
            "name": "Carlos Silva",
            "login": "carlos_silva@gmail.com",
            "password": "carlos123",
            "birth_date": "1999-11-02",
            "gender": "MALE",
            "user_type": "DOCTOR",
            "doctor_specialty": "PEDIATRICIAN",
        },
        "patient": {
            "id": 8,
            "name": "Marcos Santos",
            "login": "marcos_santos@gmail.com",
            "password": "marc123",
            "birth_date": "1977-11-04",
            "gender": "MALE",
            "user_type": "PATIENT",
            "doctor_specialty": None,
        },
    },
    {
        "id": 3,
        "start": "2021-03-25T15:30:00Z",
        "end": "2021-03-25T16:00:00Z",
        "extra_data": "",
        "timestamp": "2021-03-25T15:45:00Z",
        "address": "Rua Salvador 123",
        "status": "DONE",
        "prescription": "Paciente precisa tomar uma cápsula de vitamina D por semana",
        "doctor": {
            "id": 1,
            "name": "Andrei Silva",
            "login": "andrei_silva@gmail.com",
            "password": "andrei123",
            "birth_date": "1978-11-02",
            "gender": "MALE",
            "user_type": "DOCTOR",
            "doctor_specialty": "CARDIOLOGIST",
        },
        "patient": {
            "id": 9,
            "name": "Susana Ferreira",
            "login": "susana_ferreira@gmail.com",
            "password": "sus123",
            "birth_date": "1976-10-12",
            "gender": "FEMALE",
            "user_type": "PATIENT",
            "doctor_specialty": None,
        },
    },
    {
        "id": 4,
        "start": "2021-07-25T14:30:00Z",
        "end": "2021-07-25T15:00:00Z",
        "extra_data": "",
        "timestamp": "2021-03-25T15:45:00Z",
        "address": "Rua Fernando 123",
        "status": "ACTIVE",
        "prescription": None,
        "doctor": {
            "id": 3,
            "name": "Mariana Torres",
            "login": "mariana_torres@gmail.com",
            "password": "mari123",
            "birth_date": "1966-11-02",
            "gender": "FEMALE",
            "user_type": "DOCTOR",
            "doctor_specialty": "OPHTALMOLOGIST",
        },
        "patient": {
            "id": 9,
            "name": "Susana Ferreira",
            "login": "susana_ferreira@gmail.com",
            "password": "sus123",
            "birth_date": "1976-10-12",
            "gender": "FEMALE",
            "user_type": "PATIENT",
            "doctor_specialty": None,
        },
    },
    {
        "id": 5,
        "start": "2021-05-25T15:30:00Z",
        "end": "2021-05-25T16:00:00Z",
        "extra_data": "",
        "timestamp": "2021-03-25T15:45:00Z",
        "address": "Rua Salvador 123",
        "status": "ACTIVE",
        "prescription": None,
        "doctor": {
            "id": 2,
            "name": "Carlos Silva",
            "login": "carlos_silva@gmail.com",
            "password": "carlos123",
            "birth_date": "1999-11-02",
            "gender": "MALE",
            "user_type": "DOCTOR",
            "doctor_specialty": "PEDIATRICIAN",
        },
        "patient": {
            "id": 10,
            "name": "Eduardo Ferreira",
            "login": "eduardo_ferreira@gmail.com",
            "password": "edu123",
            "birth_date": "1966-07-12",
            "gender": "MALE",
            "user_type": "PATIENT",
            "doctor_specialty": None,
        },
    },
    {
        "id": 6,
        "start": "2021-05-25T11:30:00Z",
        "end": "2021-05-25T12:00:00Z",
        "extra_data": "",
        "timestamp": "2021-03-25T15:45:00Z",
        "address": "Rua Carlos Gonçalvez 123",
        "status": "ACTIVE",
        "prescription": None,
        "doctor": {
            "id": 4,
            "name": "Diana Telles",
            "login": "diana_telles@gmail.com",
            "password": "diana123",
            "birth_date": "1986-11-02",
            "gender": "FEMALE",
            "user_type": "DOCTOR",
            "doctor_specialty": "ONCOLOGIST",
        },
        "patient": {
            "id": 10,
            "name": "Eduardo Ferreira",
            "login": "eduardo_ferreira@gmail.com",
            "password": "edu123",
            "birth_date": "1966-07-12",
            "gender": "MALE",
            "user_type": "PATIENT",
            "doctor_specialty": None,
        },
    },
    {
        "id": 7,
        "start": "2021-01-25T15:30:00Z",
        "end": "2021-01-25T16:00:00Z",
        "extra_data": "",
        "timestamp": "2021-03-25T15:45:00Z",
        "address": "Rua João Salvador 123",
        "status": "DONE",
        "prescription": None,
        "doctor": {
            "id": 5,
            "name": "Lilian Mattos",
            "login": "lilian_mattos@gmail.com",
            "password": "lili123",
            "birth_date": "1978-11-02",
            "gender": "FEMALE",
            "user_type": "DOCTOR",
            "doctor_specialty": "DERMATOLOGIST",
        },
        "patient": {
            "id": 11,
            "name": "Cristiane Telles",
            "login": "cristiane_telles@gmail.com",
            "password": "cris123",
            "birth_date": "1979-11-05",
            "gender": "FEMALE",
            "user_type": "PATIENT",
            "doctor_specialty": None,
        },
    },
    {
        "id": 8,
        "start": "2021-08-22T15:30:00Z",
        "end": "2021-08-22T16:00:00Z",
        "extra_data": "",
        "timestamp": "2021-03-25T15:45:00Z",
        "address": "Rua João Salvador 123",
        "status": "ACTIVE",
        "prescription": None,
        "doctor": {
            "id": 2,
            "name": "Carlos Silva",
            "login": "carlos_silva@gmail.com",
            "password": "carlos123",
            "birth_date": "1999-11-02",
            "gender": "MALE",
            "user_type": "DOCTOR",
            "doctor_specialty": "PEDIATRICIAN",
        },
        "patient": {
            "id": 11,
            "name": "Cristiane Telles",
            "login": "cristiane_telles@gmail.com",
            "password": "cris123",
            "birth_date": "1979-11-05",
            "gender": "FEMALE",
            "user_type": "PATIENT",
            "doctor_specialty": None,
        },
    },
    {
        "id": 9,
        "start": "2021-08-22T10:30:00Z",
        "end": "2021-08-22T11:00:00Z",
        "extra_data": "",
        "timestamp": "2021-03-25T15:45:00Z",
        "address": "Rua Marcelo Santos 123",
        "status": "ACTIVE",
        "prescription": None,
        "doctor": {
            "id": 6,
            "name": "Cecília Silveira",
            "login": "cecilia_silveira@gmail.com",
            "password": "ceci123",
            "birth_date": "1989-11-02",
            "gender": "FEMALE",
            "user_type": "DOCTOR",
            "doctor_specialty": "CARDIOLOGIST",
        },
        "patient": {
            "id": 12,
            "name": "João Marcelo",
            "login": "joao_marcelo@gmail.com",
            "password": "joao123",
            "birth_date": "1977-10-12",
            "gender": "MALE",
            "user_type": "PATIENT",
            "doctor_specialty": None,
        },
    },
    {
        "id": 10,
        "start": "2021-11-12T09:30:00Z",
        "end": "2021-11-12T10:00:00Z",
        "extra_data": "",
        "timestamp": "2021-03-25T15:45:00Z",
        "address": "Rua Protásio Alves 123",
        "status": "ACTIVE",
        "prescription": None,
        "doctor": {
            "id": 7,
            "name": "Marcelo Barros",
            "login": "marcelo_barros@gmail.com",
            "password": "marc123",
            "birth_date": "1979-09-02",
            "gender": "MALE",
            "user_type": "DOCTOR",
            "doctor_specialty": "OPHTALMOLOGIST",
        },
        "patient": {
            "id": 12,
            "name": "João Marcelo",
            "login": "joao_marcelo@gmail.com",
            "password": "joao123",
            "birth_date": "1977-10-12",
            "gender": "MALE",
            "user_type": "PATIENT",
            "doctor_specialty": None,
        },
    },
    {
        "id": 11,
        "start": "2021-07-22T07:30:00Z",
        "end": "2021-07-22T08:00:00Z",
        "extra_data": "",
        "timestamp": "2021-03-25T15:45:00Z",
        "address": "Rua João Salvador 123",
        "status": "ACTIVE",
        "prescription": None,
        "doctor": {
            "id": 1,
            "name": "Andrei Silva",
            "login": "andrei_silva@gmail.com",
            "password": "andrei123",
            "birth_date": "1978-11-02",
            "gender": "MALE",
            "user_type": "DOCTOR",
            "doctor_specialty": "CARDIOLOGIST",
        },
        "patient": {
            "id": 13,
            "name": "Carlos Santos",
            "login": "carlos_santos@gmail.com",
            "password": "carlos123",
            "birth_date": "1998-12-12",
            "gender": "MALE",
            "user_type": "PATIENT",
            "doctor_specialty": None,
        },
    },
    {
        "id": 12,
        "start": "2021-09-01T16:30:00Z",
        "end": "2021-09-01T17:00:00Z",
        "extra_data": "",
        "timestamp": "2021-03-25T15:45:00Z",
        "address": "Rua Selena Salvador 123",
        "status": "ACTIVE",
        "prescription": None,
        "doctor": {
            "id": 2,
            "name": "Carlos Silva",
            "login": "carlos_silva@gmail.com",
            "password": "carlos123",
            "birth_date": "1999-11-02",
            "gender": "MALE",
            "user_type": "DOCTOR",
            "doctor_specialty": "PEDIATRICIAN",
        },
        "patient": {
            "id": 13,
            "name": "Carlos Santos",
            "login": "carlos_santos@gmail.com",
            "password": "carlos123",
            "birth_date": "1998-12-12",
            "gender": "MALE",
            "user_type": "PATIENT",
            "doctor_specialty": None,
        },
    },
    {
        "id": 13,
        "start": "2021-03-22T17:30:00Z",
        "end": "2021-03-22T18:00:00Z",
        "extra_data": "",
        "timestamp": "2021-03-25T15:45:00Z",
        "address": "Rua João Salvador 123",
        "status": "DONE",
        "prescription": "Paciente precisa fazer exames de sangue",
        "doctor": {
            "id": 2,
            "name": "Carlos Silva",
            "login": "carlos_silva@gmail.com",
            "password": "carlos123",
            "birth_date": "1999-11-02",
            "gender": "MALE",
            "user_type": "DOCTOR",
            "doctor_specialty": "PEDIATRICIAN",
        },
        "patient": {
            "id": 14,
            "name": "Samanta Ferreira",
            "login": "samanta_ferreira@gmail.com",
            "password": "sam123",
            "birth_date": "1988-10-12",
            "gender": "FEMALE",
            "user_type": "PATIENT",
            "doctor_specialty": None,
        },
    },
    {
        "id": 14,
        "start": "2020-08-22T13:30:00Z",
        "end": "2020-08-22T14:00:00Z",
        "extra_data": "",
        "timestamp": "2021-03-25T15:45:00Z",
        "address": "Rua João Salvador 123",
        "status": "DONE",
        "prescription": "Paciente precisa fazer uma tomografia",
        "doctor": {
            "id": 3,
            "name": "Mariana Torres",
            "login": "mariana_torres@gmail.com",
            "password": "mari123",
            "birth_date": "1966-11-02",
            "gender": "FEMALE",
            "user_type": "DOCTOR",
            "doctor_specialty": "OPHTALMOLOGIST",
        },
        "patient": {
            "id": 15,
            "name": "Laura Santos",
            "login": "laura_santos@gmail.com",
            "password": "lau123",
            "birth_date": "1980-11-06",
            "gender": "FEMALE",
            "user_type": "PATIENT",
            "doctor_specialty": None,
        },
    },
    {
        "id": 15,
        "start": "2020-09-22T10:30:00Z",
        "end": "2021-09-22T11:00:00Z",
        "extra_data": "",
        "timestamp": "2021-03-25T15:45:00Z",
        "address": "Rua João Salvador 123",
        "status": "ACTIVE",
        "prescription": None,
        "doctor": {
            "id": 2,
            "name": "Carlos Silva",
            "login": "carlos_silva@gmail.com",
            "password": "carlos123",
            "birth_date": "1999-11-02",
            "gender": "MALE",
            "user_type": "DOCTOR",
            "doctor_specialty": "PEDIATRICIAN",
        },
        "patient": {
            "id": 16,
            "name": "Tatiana Freitas",
            "login": "tatiana_freitas@gmail.com",
            "password": "tati123",
            "birth_date": "1988-10-12",
            "gender": "FEMALE",
            "user_type": "PATIENT",
            "doctor_specialty": None,
        },
    },
    {
        "id": 16,
        "start": "2021-09-22T15:30:00Z",
        "end": "2021-09-22T16:00:00Z",
        "extra_data": "",
        "timestamp": "2021-03-25T15:45:00Z",
        "address": "Rua João Salvador 123",
        "status": "ACTIVE",
        "prescription": None,
        "doctor": {
            "id": 5,
            "name": "Lilian Mattos",
            "login": "lilian_mattos@gmail.com",
            "password": "lili123",
            "birth_date": "1978-11-02",
            "gender": "FEMALE",
            "user_type": "DOCTOR",
            "doctor_specialty": "DERMATOLOGIST",
        },
        "patient": {
            "id": 16,
            "name": "Tatiana Freitas",
            "login": "tatiana_freitas@gmail.com",
            "password": "tati123",
            "birth_date": "1988-10-12",
            "gender": "FEMALE",
            "user_type": "PATIENT",
            "doctor_specialty": None,
        },
    },
]
