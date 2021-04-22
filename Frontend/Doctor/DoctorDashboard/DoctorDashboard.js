// We need to wait DOM to load before calling other functions
document.addEventListener('DOMContentLoaded', init, false);

// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();
var selectedAppointment;

function init() {

    // Cancel appointment
    document.getElementById("cancelAppointmentButton").addEventListener("click", function() {
        cancelAppointment();
    });

    // Mock for creating itens
    testAppointment1 = new Appointment('5011', 'Amanda Pires', '12:10-12:30')
    testAppointment2 = new Appointment('5012', 'Carlos Hickmann', '14:30-15:30')
    testAppointment3 = new Appointment('5013', 'João Nascimento', '11:30-11:45')
    testAppointment4 = new Appointment('5014', 'Beatriz Ribeiro', '18:30-18:50')
    testAppointment5 = new Appointment('5015', 'Joana Telles', '19:00-19:30')
    testAppointment6 = new Appointment('5016', 'Marta Nascimenton', '19:30-20:00')
    testAppointment7 = new Appointment('5017', 'Orlando Wender', '20:30-21:00')
    createAppointmentItem(testAppointment1)
    createAppointmentItem(testAppointment2)
    createAppointmentItem(testAppointment3)
    createAppointmentItem(testAppointment4)
    createAppointmentItem(testAppointment5)
    createAppointmentItem(testAppointment6)
    createAppointmentItem(testAppointment7)
}

//*************************************************
// MARK: - Layout creation
//*************************************************
function createAppointmentItem(appointment) {
    const appointmentsTableBody = document.getElementById("appointmentsTableBody");
    const tr = document.createElement("tr");
    const patientNameTd = document.createElement("td");
    const hourTd = document.createElement("td");
    const cancelTd = document.createElement("td");

    const cancelButton = createcancelButton(appointment.id);

    patientNameTd.textContent = appointment.doctorName
    hourTd.textContent = appointment.hour

    // Set all appointments attributes on its row (tr is a row), because it will be easier to get these elements later
    tr.setAttribute("id", appointment.id);

    appointmentsTableBody.appendChild(tr);
    tr.appendChild(patientNameTd);
    tr.appendChild(hourTd);
    tr.appendChild(cancelTd);
    cancelTd.appendChild(cancelButton);
}

function createcancelButton(buttonID) {
    const cancelButton = document.createElement("button");

    cancelButton.setAttribute("id", "cancelButton" + buttonID);
    cancelButton.setAttribute("type", "button");
    cancelButton.setAttribute("class", "btn font-weight-bold text-danger");
    cancelButton.setAttribute("data-toggle", "modal");
    cancelButton.setAttribute("data-target", "#cancelModal");
    cancelButton.innerHTML = "<u> Cancelar consulta </u>";
    setcancelButtonListener(cancelButton)

    return cancelButton;
}

//*************************************************
// MARK: - Listeners configuration
//*************************************************
function setcancelButtonListener(cancelButton) {
    cancelButton.addEventListener('click', function () {
        const cancelButtonID = cancelButton.getAttribute("id");
        const appointmentId = cancelButtonID.replace("cancelButton", "");
        const editingAppointment = document.getElementById(appointmentId);

        selectedAppointment = new Appointment(appointmentId, "", "")
    });
}

function cancelAppointment() {
    cancelAppointmentRequest()
    cancelButton = document.getElementById("cancelButton" + selectedAppointment.id);
    cancelButton.textContent = "Consulta cancelada";
    cancelButton.classList.remove("text-danger")
    cancelButton.disabled = true;
}

//*************************************************
// MARK: - Requests
//*************************************************
function cancelAppointmentRequest() {
    // TODO: Implement request to cancel an appointment
}

function getAppointmentsRequest() {
    // TODO: Implement request to get patient appointments
}