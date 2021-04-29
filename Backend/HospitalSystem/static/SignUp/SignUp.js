// We need to wait DOM to load before calling other functions
document.addEventListener('DOMContentLoaded', init, false);

function init() {
    document.getElementById('signUpButton').addEventListener('click', function() {
        registerRequest();
    });
}

function parseUserInformations() {
    const userName = document.getElementById('nameInput').value;
    const userLogin = document.getElementById('loginInput').value;
    const userPassword = document.getElementById('passwordInput').value;
    const userBirthday = document.getElementById('birthdayInput').value;
    var userGender = document.getElementById('genderList').value; 
    var userType = document.getElementById('userTypeList').value;

    if (userGender == "Masculino") {
        userGender = "MALE";
    } else if (userGender == "Feminino") {
        userGender = "FEMALE";
    } else {
        userGender = "OTHER"
    }

    if (userType == "Paciente") {
        userType = "PATIENT"
    } else if (userType == "Médico") {
        userType = "DOCTOR"
    } else if (userType == "Recepcionista") {
        userType = "RECEPTIONIST"
    }

    const params = {
        "name" : userName,
        "login" : userLogin,
        "password" : userPassword,
        "birth_date" : "1995-11-21",
        "user_type" : userType,
        "gender" : userGender
    }

    return params
}

function registerRequest() {
    var request = new XMLHttpRequest();
    request.open('POST', 'http://54.232.147.115/user/', true);
    request.setRequestHeader('Content-Type', 'application/json');

    const params = parseUserInformations();

    request.onload = function() {
        window.location.href = "../Login/login.html";
    }

    console.log(JSON.stringify(params));
    request.send(JSON.stringify(params));
}