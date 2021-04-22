// We need to wait DOM to load before calling other functions
document.addEventListener('DOMContentLoaded', init, false);

function init() {
    getDoctorsRequest().then(result => {
        setDoctorsNameList(result);

        // Schedules an appointment
        document.getElementById("scheduleAppointmentButton").addEventListener("click", function() {
            scheduleAppointmentRequest()
        });
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

//*************************************************
// MARK: - Requests
//*************************************************
async function getDoctorsRequest() {
    try {
        let doctors = await ApiClient.get("doctors");
        return doctors.map(s => s.name);
    } 
    catch {
    // Offline fallback
        return [
            "Beatriz Ribeiro",
            "João Nascimento",
            "Martha Torres",
            "Camila Oliveira",
            "André Menezes"
        ]
    }
}

function scheduleAppointmentRequest() {
    // TODO: Implement request to schedule an appointment
}