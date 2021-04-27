// We need to wait DOM to load before calling other functions
document.addEventListener('DOMContentLoaded', init, false);

function init() {
    document.getElementById('specialityList').addEventListener('change', function() {
        getDoctorsRequest().then(result => {
            setDoctorsNameList(result);
        });
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
function setDoctorsNameList(doctorsList) {
    doctorNameDropDown = document.getElementById("doctorsNameList");

    doctorsList.forEach(doctorName => {
        let option = document.createElement('option');
        option.setAttribute('value', doctorName)
        let optionName = document.createTextNode(doctorName);
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
async function getDoctorsRequest() {
    // try {
    //     let doctors = await ApiClient.get("doctors");
    //     document.getElementById('doctorNameDropdown').removeAttribute('hidden');
    //     return doctors.map(s => s.name);
    // } 
    // catch {
    // // Offline fallback
    //     document.getElementById('doctorNameDropdown').removeAttribute('hidden');
    //     return [
    //         "-",
    //         "Beatriz Ribeiro",
    //         "João Nascimento",
    //         "Martha Torres",
    //         "Camila Oliveira",
    //         "André Menezes"
    //     ]
    // }
    document.getElementById('doctorNameDropdown').removeAttribute('hidden');
    return [
        "-",
        "Beatriz Ribeiro",
        "João Nascimento",
        "Martha Torres",
        "Camila Oliveira",
        "André Menezes"
    ]
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
    // TODO: Implement request to schedule an appointment
    document.getElementById('modalTitle').textContent = "Consulta agendada com sucesso!"
}