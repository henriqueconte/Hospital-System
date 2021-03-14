// We need to wait DOM to load before calling other functions
document.addEventListener('DOMContentLoaded', init, false);

// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();
var doctorsList;

function init() {
    doctorsList = getDoctorsRequest();
    setDoctorsNameList();

    // Schedules an appointment
    document.getElementById("scheduleAppointmentButton").addEventListener("click", function() {
        scheduleAppointmentRequest()
    });
}

//*************************************************
// MARK: - Layout creation
//*************************************************
function setDoctorsNameList() {
    doctorNameDropDown = document.getElementById("doctorsNameList");

    doctorsList.forEach(doctorName => {
        var option = document.createElement('option');
        option.setAttribute('value', doctorName)
        var optionName = document.createTextNode(doctorName);
        option.appendChild(optionName)

        doctorNameDropDown.appendChild(option)
    });
}

//*************************************************
// MARK: - Requests
//*************************************************
function getDoctorsRequest() {
    // TODO: Implement request to get doctors list
    return [
        "Beatriz Ribeiro",
        "João Nascimento",
        "Martha Torres",
        "Camila Oliveira",
        "André Menezes"
    ]
}

function scheduleAppointmentRequest() {
    // TODO: Implement request to schedule an appointment
}