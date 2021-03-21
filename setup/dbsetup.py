import requests
import json

USER_ENDPOINT = "http://localhost:8000/user/"
DOCTOR_ENDPOINT = "http://localhost:8000/doctor/"


def add_user(first_name, last_name, login, password):
    result = requests.post(
        USER_ENDPOINT,
        json={
            "first_name": first_name,
            "last_name": last_name,
            "login": login,
            "password": password,
        },
    )
    if not result.ok:
        assert result.ok


def add_doctor(first_name, last_name, specialty):
    result = requests.post(
        DOCTOR_ENDPOINT,
        json={
            "first_name": first_name,
            "last_name": last_name,
            "specialty": specialty,
        },
    )
    if not result.ok:
        assert result.ok


def model_exists(endpoint, id):
    result = requests.get(f"{endpoint}{id}")
    return result.ok


def get_model_object(endpoint, id):
    result = requests.get(f"{endpoint}{id}")
    return json.loads(result.text)


def add_if_undefined(endpoint, id, *args):
    if not model_exists(endpoint, id):
        if endpoint == USER_ENDPOINT:
            add_user(*args)
        elif endpoint == DOCTOR_ENDPOINT:
            add_doctor(*args)
        print(get_model_object(endpoint, id))
    else:
        print(get_model_object(endpoint, id))


add_if_undefined(USER_ENDPOINT, 1, "joaozinho", "teste", "teste", "123456")
add_if_undefined(DOCTOR_ENDPOINT, 1, "maria", "teste", "cardiologista")
add_if_undefined(DOCTOR_ENDPOINT, 2, "jorge", "testudo", "dermatologista")
add_if_undefined(DOCTOR_ENDPOINT, 3, "miguel", "barbiz", "ortopedista")
add_if_undefined(DOCTOR_ENDPOINT, 4, "carla", "bar", "neurologista")
add_if_undefined(DOCTOR_ENDPOINT, 5, "luciana", "foo", "oftalmologista")
add_if_undefined(DOCTOR_ENDPOINT, 6, "joaquim", "foobar", "clínico geral")

