import requests
import json

# IP PROD = 54.232.147.115 
HOST_IP = "127.0.0.1"

USER_ENDPOINT = f"http://{HOST_IP}/user/"
APPOINTMENT_ENDPOINT = f"http://{HOST_IP}/appointment/"


def add_user(name, login, password, birth_date, gender, user_type):
    result = requests.post(
        USER_ENDPOINT,
        json={
            "name": name,
            "login": login,
            "password": password,
            "birth_date": birth_date,
            "gender": gender,
            "user_type": user_type,
        },
    )

    print(result.content)
    if not result.ok:
        assert result.ok


def add_appointment(patience_id, doctor_id, start, end, address, extra_data=None):
    result = requests.post(
        APPOINTMENT_ENDPOINT,
        json={
            "patience": patience_id,
            "doctor": doctor_id,
            "start": start,
            "end": end,
            "extra_data": json.dumps(extra_data),
            "address": address,
        },
    )
    if not result.ok:
        assert result.ok


# name, login, password, birth_date, gender, user_type
add_user("joaozinho", "joaozinho", "teste", "1990-03-25", "MALE", "PATIENCE")
add_user("mariazinha", "mariazinha", "teste", "1990-03-25", "FEMALE", "PATIENCE")


# Doctors
add_user("Jorge Joaquim", "jorge", "teste", "1980-03-23", "MALE", "DOCTOR")
add_user("Joana Joaquina", "joaquina", "teste", "1980-01-25", "FEMALE", "DOCTOR")
add_user("Marcos Miguel", "marcos", "teste", "1970-07-15", "MALE", "DOCTOR")
add_user("Jaqueline Jaquelina", "jaqueline", "teste", "1970-07-15", "FEMALE", "DOCTOR")

# id,user,doctor,datetime
# patience_id, doctor_id, start, end, address,extra_data=None
add_appointment(
    1, 3, "2021-03-25T12:00:00-03:00", "2021-03-25T12:45:00-03:00", "Rua Teste 1."
)


add_appointment(
    2, 3, "2021-03-26T12:00:00-03:00", "2021-03-26T12:45:00-03:00", "Rua Teste 1."
)

add_appointment(
    1, 4, "2021-03-27T12:00:00-03:00", "2021-03-27T12:45:00-03:00", "Avenida Testando"
)


add_appointment(
    1,
    5,
    "2021-03-30T12:00:00-03:00",
    "2021-03-30T12:45:00-03:00",
    "Rua Foobar.",
)
