import requests


# add user
def add_user(first_name, last_name, login, password):
    result = requests.put(
        "localhost:8000/user",
        json={
            "first_name": first_name,
            last_name: last_name,
            login: login,
            password: password,
        },
    )

    assert result.ok

def get_user:
    result = requests.get("localhost:8000/user/1")

add_user("joãozinho", "teste", "teste", "123456")


