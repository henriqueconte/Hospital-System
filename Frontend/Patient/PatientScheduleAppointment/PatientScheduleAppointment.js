// We need to wait DOM to load before calling other functions
document.addEventListener('DOMContentLoaded', init, false);
const loggedUser = JSON.parse(sessionStorage.getItem('loggedUser')); 
var doctorsList = [];

function init() {
    document.getElementById('specialityList').addEventListener('change', function() {
        getDoctorsRequest();
    });

    document.getElementById('doctorsNameList').addEventListener('change', function() {
        getDoctorAvailableDates();
    });

    document.getElementById('appointmentDateForm').addEventListener('change', function () {
        document.getElementById('scheduleAppointmentButton').removeAttribute('hidden');
    });

    // Schedules an appointment
    document.getElementById("scheduleAppointmentButton").addEventListener("click", function() {
        scheduleAppointmentRequest()
    });
}

//*************************************************
// MARK: - Layout creation
//*************************************************
function setDoctorsNameList(json) {
    doctorNameDropDown = document.getElementById("doctorsNameList");

    json.forEach(doctor => {
        doctorsList.push(
            new User(doctor.id, doctor.name, doctor.login, doctor.birth_date, doctor.gender, doctor.user_type)
        )
        let option = document.createElement('option');
        option.setAttribute('value', doctor.name)
        option.setAttribute('doctorId', doctor.id);
        let optionName = document.createTextNode(doctor.name);
        option.appendChild(optionName)

        doctorNameDropDown.appendChild(option)
    });
}

function setAvailableDates(availableDates) {
    dateList = document.getElementById('appointmentDateForm');

    availableDates.forEach(date => {
        let option = document.createElement('option');
        option.setAttribute('value', date);
        let optionName = document.createTextNode(date);
        option.appendChild(optionName);

        dateList.appendChild(option);
    })
}


//*************************************************
// MARK: - Requests
//*************************************************
function getDoctorsRequest() {
    var request = new XMLHttpRequest();
    const selectedSpeciality = parseDoctorSpeciality();
    request.open('GET', 'http://54.232.147.115/doctors/?specialty=' + selectedSpeciality, true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function() {
        var response = JSON.parse(this.response);
        document.getElementById('doctorNameDropdown').removeAttribute('hidden');

        setDoctorsNameList(response);

        console.log(response);
    }

    request.send();
}

function getDoctorAvailableDates() {
    // TODO: Implement request to get doctor available dates
    document.getElementById('dateDropdown').removeAttribute('hidden');

    var dates = [
        "-",
        "15/07/21 - 12:30",
        "15/07/21 - 14:30",
        "16/07/21 - 12:30",
        "16/07/21 - 15:30"
    ]

    setAvailableDates(dates)
}

function scheduleAppointmentRequest() {
    var request = new XMLHttpRequest();
    request.open('POST', 'http://54.232.147.115/appointment/', true);
    request.setRequestHeader('Content-Type', 'application/json');
    const params = parseNewAppointment();

    request.onload = function() {
        var response = JSON.parse(this.response);

        document.getElementById('modalTitle').textContent = "Consulta agendada com sucesso!"

        console.log(response);
    }

    request.send(JSON.stringify(params));
}

//*************************************************
// MARK: - Parsers
//*************************************************
function parseDoctorSpeciality() {
    const selectedSpeciality = document.getElementById('specialityList').value;
    var translatedSpeciality = ""

    if (selectedSpeciality == "Cardiologista") {
        translatedSpeciality = "CARDIOLOGIST";
    } else if (selectedSpeciality == "Oftalmologista") {
        translatedSpeciality = "OPHTHALMOLOGIST";
    } else if (selectedSpeciality == "Dermatologista") {
        translatedSpeciality = "DERMATOLOGIST";
    } else if (selectedSpeciality == "Oncologista") {
        translatedSpeciality = "ONCOLOGIST";
    } else if (selectedSpeciality == "Pediatra") {
        translatedSpeciality = "PEDITRICIAN";
    }

    return translatedSpeciality;
}

function parseNewAppointment() {
    var selectedDoctorId;
    var dropDownDoctor = document.getElementById("doctorsNameList").value;
    for (i in doctorsList) {
        if (doctorsList[i].name == dropDownDoctor) {
            selectedDoctorId = doctorsList[i].id;
        }
    }

    const params = {
        'doctor' : selectedDoctorId,
        'patient' : loggedUser.id,
        'start' : "2018-11-20T15:58:44.767594-06:00",
        'end' : '2018-11-20T15:58:44.767594-06:00',
        'address' : 'Av. Soledade, 619',
        'extra_data' : '',
        'status' : 'ACTIVE',
        'prescription' : ''
    }

    return params;
}