// We need to wait DOM to load before calling other functions
document.addEventListener('DOMContentLoaded', init, false);

// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();
var selectedAppointment;

function init() {

    // Mock for creating itens
    testAppointment4 = new Appointment('5014', 'Beatriz Ribeiro', '18:30-18:50')
    testAppointment5 = new Appointment('5015', 'Joana Telles', '19:00-19:30')
    testAppointment6 = new Appointment('5016', 'Marta Nascimenton', '19:30-20:00')
    testAppointment7 = new Appointment('5017', 'Orlando Wender', '20:30-21:00')
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
    const doctorNameTd = document.createElement("td");
    const hourTd = document.createElement("td");
    const medicalRequisitionTd = document.createElement("td");
    const detailsTd = document.createElement("td");

    const detailsButton = createDetailsButton(appointment.id);

    doctorNameTd.textContent = appointment.doctorName
    hourTd.textContent = appointment.hour
    medicalRequisitionTd.textContent = "Não há requisição médica disponível"

    // Set all appointments attributes on its row (tr is a row), because it will be easier to get these elements later
    tr.setAttribute("id", appointment.id);
    tr.setAttribute("doctorName", appointment.doctorName);
    tr.setAttribute("appointmentHour", appointment.hour);

    appointmentsTableBody.appendChild(tr);
    tr.appendChild(doctorNameTd);
    tr.appendChild(hourTd);
    tr.append(medicalRequisitionTd);
    tr.appendChild(detailsTd);
    detailsTd.appendChild(detailsButton);
}

function createDetailsButton(buttonID) {
    const detailsButton = document.createElement("button");

    detailsButton.setAttribute("id", "seeDetailsButton" + buttonID);
    detailsButton.setAttribute("type", "button");
    detailsButton.setAttribute("class", "btn font-weight-bold");
    detailsButton.setAttribute("data-toggle", "modal");
    detailsButton.setAttribute("data-target", "#seeDetailsModal");
    detailsButton.innerHTML = "<u> Ver detalhes </u>";
    setDetailsButtonListener(detailsButton)

    return detailsButton;
}

//*************************************************
// MARK: - Listeners configuration
//*************************************************
function setDetailsButtonListener(detailsButton) {
    detailsButton.addEventListener('click', function () {
        const detailsButtonID = detailsButton.getAttribute("id");
        const appointmentId = detailsButtonID.replace("seeDetailsButton", "");
        const editingAppointment = document.getElementById(appointmentId);
        const doctorName = editingAppointment.getAttribute("doctorName");
        const appointmentHour = editingAppointment.getAttribute("appointmentHour");

        document.getElementById("doctorNameForm").textContent = doctorName;
        document.getElementById("appointmentHourForm").textContent = appointmentHour;

        selectedAppointment = new Appointment(appointmentId, doctorName, appointmentHour)
    });
}

function cancelAppointment() {
    cancelAppointmentRequest()
    detailsButton = document.getElementById("seeDetailsButton" + selectedAppointment.id);
    detailsButton.textContent = "Consulta cancelada";
    detailsButton.disabled = true;
}

//*************************************************
// MARK: - Layout creation
//*************************************************
function getAppointmentsRequest() {
    // TODO: Implement request to get patient appointments
}