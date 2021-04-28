
// We need to wait DOM to load before calling other functions
document.addEventListener('DOMContentLoaded', init, false);

function init() {
	document.getElementById("LoginButton").addEventListener("click", function() {
        const login = document.getElementById('emailInput').value;
        const password = document.getElementById('passwordInput').value;

        tryLogin(login, password);
    });
}

function tryLogin(login, password) {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://54.232.147.115/login/?user_login=' + login + '&user_password=' + password, true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function() {
        var response = JSON.parse(this.response);

        if (response.errors != null) {
            document.getElementById('emailInput').style.borderWidth = "1px";
            document.getElementById('emailInput').style.borderColor = "red";
            
            document.getElementById('passwordInput').style.borderWidth = "1px";
            document.getElementById('passwordInput').style.borderColor = "red";
        } else {
            const response = JSON.parse(this.response);

            const loggedUser = new User(response.id, response.name, response.login, response.birth_date, response.gender, response.user_type);
            sessionStorage.setItem("loggedUser", loggedUser);

            console.log(loggedUser);
            if (loggedUser.userType == "PATIENT") {
                window.location.href = "../Patient/PatientDashboard/PatientDashboard.html";
            } else if (loggedUser.userType == "DOCTOR") {
                window.location.href = "../Doctor/DoctorDashboard/DoctorDashboard.html";
            } else if (loggedUser.userType == "RECEPTIONIST") {
                window.location.href = "../Receptionist/ReceptionistDashboard/ReceptionistDashboard.html";
            }
        }
    }

    request.send();
}