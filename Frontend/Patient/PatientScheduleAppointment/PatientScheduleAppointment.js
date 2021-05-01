// We need to wait DOM to load before calling other functions
document.addEventListener('DOMContentLoaded', init, false);
const loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'));
var doctorsList = [];

function init() {
    document.getElementById('specialityList').addEventListener('change', function () {
        getDoctorsRequest();
    });

    document.getElementById('doctorsNameList').addEventListener('change', function () {
        getDoctorAvailableDates();
    });

    document.getElementById('appointmentDateForm').addEventListener('change', function () {
        document.getElementById('scheduleAppointmentButton').removeAttribute('hidden');
    });

    // Schedules an appointment
    document.getElementById("scheduleAppointmentButton").addEventListener("click", function () {
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

    request.onload = function () {
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

    const oneWeekFromNow = addDays(new Date(), 7);



    const formatDay = (date) => {
        return `${zeroPad(date.getDate())}/${zeroPad(date.getMonth() + 1)}/${date.getFullYear() - 2000}`
    }


    let dates = [
        "-",
        `${formatDay(oneWeekFromNow)} - 12:30`,
        `${formatDay(oneWeekFromNow)} - 14:30`,
        `${formatDay(addDays(oneWeekFromNow, 1))} - 15:30`,
        `${formatDay(addDays(oneWeekFromNow, 2))} - 14:30`,
        `${formatDay(addDays(oneWeekFromNow, 2))} - 11:00`,
        `${formatDay(addDays(oneWeekFromNow, 2))} - 16:00`
    ]

    setAvailableDates(dates)
}

function scheduleAppointmentRequest() {
    var request = new XMLHttpRequest();
    request.open('POST', 'http://54.232.147.115/appointment/', true);
    request.setRequestHeader('Content-Type', 'application/json');
    const params = parseNewAppointment();

    request.onload = function () {
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
    const select = document.getElementById('appointmentDateForm');

    // format: 08/05/21 - 12:30
    const parseDatetime = (dateStr) => {
        const [day, month, year] = `${dateStr}`.split("-")[0].trim().split("/");
        const [hour, minute] = `${dateStr}`.split("-")[1].trim().split(":");

        let start = new Date();
        start.setFullYear((+year) + 2000)
        start.setDate(+day);
        start.setHours(+hour);
        start.setMonth(+month + 1)
        start.setMinutes(+minute)

        const end = addMinutes(start, 45);
        // 2018-11-20T15:58:44.767594-06:00
        const startDatestr = `${start.getFullYear()}-${month}-${day}T${hour}:${minute}:00.000000-03:00`
        const endDateStr = `${start.getFullYear()}-${month}-${day}T${zeroPad(end.getHours())}:${zeroPad(end.getMinutes())}:00.000000-03:00`

        return [startDatestr, endDateStr]

    }

    const [start, end] = parseDatetime(select.value);
    console.log(start, end)

    for (i in doctorsList) {
        if (doctorsList[i].name == dropDownDoctor) {
            selectedDoctorId = doctorsList[i].id;
        }
    }

    const params = {
        'doctor': selectedDoctorId,
        'patient': loggedUser.id,
        'start': start,
        'end': end,
        'address': 'Av. Soledade, 619',
        'extra_data': '',
        'status': 'ACTIVE',
        'prescription': ''
    }

    return params;
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}

function zeroPad(n) {
    if (n < 10) {
        return `0${n}`
    }
    return `${n}`
}