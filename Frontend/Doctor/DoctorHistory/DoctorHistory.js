// We need to wait DOM to load before calling other functions
document.addEventListener('DOMContentLoaded', init, false);

// Create a request variable and assign a new XMLHttpRequest object to it.
let selectedAppointment;
var appointmentList = [];
const loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'));

function init() {

    // Save exam requisition
    document.getElementById("saveExamRequisition").addEventListener("click", function() {
        updateExamRequisition();
    });

    getAppointmentsRequest();
}

//*************************************************
// MARK: - Layout creation
//*************************************************
function createAppointmentItem(appointment) {
    appointmentList.push(new Appointment(
        appointment.id, 
        appointment.startDate, 
        appointment.endDate, 
        appointment.address,
        appointment.status, 
        appointment.prescription,
        new User(appointment.doctor.id, appointment.doctor.name, appointment.doctor.login, appointment.doctor.birth_date, appointment.doctor.gender, appointment.doctor.user_type), 
        new User(appointment.patient.id, appointment.patient.name, appointment.patient.login, appointment.patient.birth_date, appointment.patient.gender, appointment.patient.user_type)
    ));

    const appointmentsTableBody = document.getElementById("appointmentsTableBody");
    const tr = document.createElement("tr");
    const doctorNameTd = document.createElement("td");
    const hourTd = document.createElement("td");
    const requisitionTd = document.createElement("td");

    const requisitionButton = createrequisitionButton(appointment.id);

    doctorNameTd.textContent = appointment.doctor.name;
    if (appointment.start == null) {
        hourTd.textContent = "Horário indefinido";
    } else {
        const date = new Date(appointment.start);
        const day = date.getDay();
        const month = date.getMonth();
        const hour = date.getHours();
        const minutes = date.getMinutes();
        const formattedDay = day < 10 ? "0" + day : day
        const formattedMinutes = minutes == 0 ? minutes + "0" : minutes
        hourTd.textContent = formattedDay + "/" + month + ", às " + hour + "h" + formattedMinutes
    }

    // Set all appointments attributes on its row (tr is a row), because it will be easier to get these elements later
    tr.setAttribute("id", appointment.id);
    tr.setAttribute("examRequisition", appointment.prescription == null ? "" : appointment.prescription);

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
        
        for (i in appointmentList) {
            if (appointmentList[i].id == appointmentId) {
                selectedAppointment = appointmentList[i];
                console.log(selectedAppointment);
            }
        }
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
function getAppointmentsRequest() {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://54.232.147.115/appointment/?user_id=' + loggedUser.id, true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function() {
        var response = JSON.parse(this.response);

        response.forEach((appointment) => {
            if (appointment.status == "DONE" || appointment.status == "CANCELLED") {
                createAppointmentItem(appointment);
            }
        })
        console.log(response);
    }

    request.send();
}

function updateExamRequisition() {
    // Updates locally the exam requisition text box content
    currentExamRequisitionText = document.getElementById("examRequisitionTextBox").value;
    document.getElementById(selectedAppointment.id).setAttribute("examRequisition", currentExamRequisitionText);

    // TODO: Implement request to update appointment
    var request = new XMLHttpRequest();
    request.open('PUT', 'http://54.232.147.115/appointment/?appointment_id=' + selectedAppointment.id, true);
    request.setRequestHeader('Content-Type', 'application/json');

    const params = {
        "doctor" : selectedAppointment.doctor.id,
        "patient" : selectedAppointment.patient.id,
        "start" : selectedAppointment.startDate,
        "end" : selectedAppointment.endDate,
        "address" : selectedAppointment.address,
        "extra_data" : "",
        "status" : selectedAppointment.status,
        "prescription" : currentExamRequisitionText
    }

    request.onload = function() {
        var response = JSON.parse(this.response);

        console.log(response);
    }

    request.send(JSON.stringify(params));
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