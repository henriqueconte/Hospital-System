// We need to wait DOM to load before calling other functions
document.addEventListener('DOMContentLoaded', init, false);

// Create a request variable and assign a new XMLHttpRequest object to it.
let selectedAppointment;

function init() {

    // Save exam requisition
    document.getElementById("saveExamRequisition").addEventListener("click", function() {
        updateExamRequisition();
    });

    getAppointmentsRequest(1).then(appointments => {
        appointments.forEach(appointment => {
            createAppointmentItem(appointment)
        })
    });
}

//*************************************************
// MARK: - Layout creation
//*************************************************
function createAppointmentItem(appointment) {
    const appointmentsTableBody = document.getElementById("appointmentsTableBody");
    const tr = document.createElement("tr");
    const doctorNameTd = document.createElement("td");
    const hourTd = document.createElement("td");
    const requisitionTd = document.createElement("td");

    const requisitionButton = createrequisitionButton(appointment.id);

    doctorNameTd.textContent = appointment.doctorName
    hourTd.textContent = appointment.hour

    // Set all appointments attributes on its row (tr is a row), because it will be easier to get these elements later
    tr.setAttribute("id", appointment.id);
    tr.setAttribute("examRequisition", "Resfenol duas vezes ao dia.")

    appointmentsTableBody.appendChild(tr);
    tr.appendChild(doctorNameTd);
    tr.appendChild(hourTd);
    tr.appendChild(requisitionTd);
    requisitionTd.appendChild(requisitionButton);
}

function createrequisitionButton(buttonID) {
    const requisitionButton = document.createElement("button");

    requisitionButton.setAttribute("id", "seeRequisitionButton" + buttonID);
    requisitionButton.setAttribute("type", "button");
    requisitionButton.setAttribute("class", "btn font-weight-bold");
    requisitionButton.setAttribute("data-toggle", "modal");
    requisitionButton.setAttribute("data-target", "#seeRequisitionModal");
    requisitionButton.innerHTML = "<u> Inserir requisição para exame </u>";
    setRequisitionButtonListener(requisitionButton)

    return requisitionButton;
}

//*************************************************
// MARK: - Listeners configuration
//*************************************************
function setRequisitionButtonListener(requisitionButton) {
    requisitionButton.addEventListener('click', function () {
        const requisitionButtonID = requisitionButton.getAttribute("id");
        const appointmentId = requisitionButtonID.replace("seeRequisitionButton", "");
        const editingAppointment = document.getElementById(appointmentId);
        const examRequsition = editingAppointment.getAttribute("examRequisition");

        document.getElementById("examRequisitionTextBox").value = examRequsition;
        
        selectedAppointment = new Appointment(appointmentId, "", "", "")
    });
}

function cancelAppointment() {
    cancelAppointmentRequest()
    requisitionButton = document.getElementById("seerequisitionButton" + selectedAppointment.id);
    requisitionButton.textContent = "Consulta cancelada";
    requisitionButton.disabled = true;
}

//*************************************************
// MARK: - Requests
//*************************************************
async function getAppointmentsRequest(clientId) {
    try {
        const appointments = await ApiClient.get(`appointment/${clientId}`);
        return appointments.map(result => 
            new Appointment(
                result.id, 
                result.doctor.name, 
                formatDateString(result.start, result.end),
                result.address
                ))
    }
    catch {
        // Offline fallback
        const mocked = [
            new Appointment('5014', 'Beatriz Ribeiro', '18:30-18:50', "Av. Soledade, 569"),
            new Appointment('5015', 'Joana Telles', '19:00-19:30', "Av. Soledade, 569"),
            new Appointment('5016', 'Marta Nascimenton', '19:30-20:00', "Av. Soledade, 569"),
            new Appointment('5017', 'Orlando Wender', '20:30-21:00', "Av. Soledade, 569")
        ]
        return mocked
    }
}

function updateExamRequisition() {
    // Updates locally the exam requisition text box content
    currentExamRequisitionText = document.getElementById("examRequisitionTextBox").value;
    document.getElementById(selectedAppointment.id).setAttribute("examRequisition", currentExamRequisitionText);

    // TODO: Implement request to update appointment
}

function formatDateString(start, end) {
    const dateStart = new Date(start);
    const dateEnd = new Date(end);

    const zeroPad = (n) => {
        if (n < 10) {
            return `0${n}`
        }
        return `${n}`
    }

    const formatDay = (date) => {
        return `${date.getDate()}/${zeroPad(date.getMonth() + 1)}/${date.getFullYear() - 2000}`
    }

    const formatHour = (date) => {
        const hours = zeroPad(date.getHours())
        const minutes = zeroPad(date.getMinutes())
        return `${hours}:${minutes}`
    }

    return `${formatDay(dateStart)} - ${formatHour(dateStart)} às ${formatHour(dateEnd)}`
}