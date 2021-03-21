import requests
import json


def add_user(first_name, last_name, login, password):
    result = requests.post(
        "http://localhost:8000/user/",
        json={
            "first_name": first_name,
            "last_name": last_name,
            "login": login,
            "password": password,
        },
    )
    if(not result.ok):
        assert result.ok


def user_exists(id):
    result = requests.get(f"http://localhost:8000/user/{id}")
    return result.ok

def get_user(id):
    result = requests.get(f"http://localhost:8000/user/{id}")
    return json.loads(result.text)

if not user_exists(1):
    print("inserting user 1. login: teste, pass: 123456")
    add_user("joãozinho", "teste", "teste", "123456")
else:
    print(get_user(1))
    
