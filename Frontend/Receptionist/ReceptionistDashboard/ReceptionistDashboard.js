// We need to wait DOM to load before calling other functions
document.addEventListener("DOMContentLoaded", init, false);

// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();
var selectedAppointment;
var appointmentList = [];

function init() {
    // Cancel appointment
    document
        .getElementById("cancelAppointmentButton")
        .addEventListener("click", function () {
            updateAppointmentRequest('CANCELLED');
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

    const appointmentsTableBody = document.getElementById(
        "appointmentsTableBody"
    );
    const tr = document.createElement("tr");
    const patientNameTd = document.createElement("td");
    const doctorNameTd = document.createElement("td");
    const hourTd = document.createElement("td");
    const confirmTd = document.createElement("td");
    const cancelTd = document.createElement("td");

    const confirmButton = createConfirmButton(appointment.id);
    const cancelButton = createcancelButton(appointment.id);

    // TODO: Insert real pacient name
    patientNameTd.textContent = appointment.patient.name;
    doctorNameTd.textContent = appointment.doctor.name;
    if (appointment.start == null) {
        hourTd.textContent = "Horário indefinido";
    } else {
        const date = new Date(appointment.start);
        const day = date.getDate();
        const month = zeroPad(date.getMonth() + 1);
        const hour = date.getHours();
        const minutes = date.getMinutes();
        const formattedDay = day < 10 ? "0" + day : day
        const formattedMinutes = minutes == 0 ? minutes + "0" : minutes
        hourTd.textContent = formattedDay + "/" + month + ", às " + hour + "h" + formattedMinutes
    }

    // Set all appointments attributes on its row (tr is a row), because it will be easier to get these elements later
    tr.setAttribute("id", appointment.id);

    appointmentsTableBody.appendChild(tr);
    tr.appendChild(patientNameTd);
    tr.appendChild(doctorNameTd);
    tr.appendChild(hourTd);
    tr.appendChild(confirmTd);
    tr.appendChild(cancelTd);
    confirmTd.appendChild(confirmButton);
    cancelTd.appendChild(cancelButton);
}

function createConfirmButton(buttonID) {
    const confirmButton = document.createElement("button");

    confirmButton.setAttribute("id", "confirmButton" + buttonID);
    confirmButton.setAttribute("type", "button");
    confirmButton.setAttribute("class", "btn font-weight-bold text-primary");
    confirmButton.innerHTML = "<u> Finalizar consulta </u>";
    setConfirmButtonListener(confirmButton);

    return confirmButton;
}

function createcancelButton(buttonID) {
    const cancelButton = document.createElement("button");

    cancelButton.setAttribute("id", "cancelButton" + buttonID);
    cancelButton.setAttribute("type", "button");
    cancelButton.setAttribute("class", "btn font-weight-bold text-danger");
    cancelButton.setAttribute("data-toggle", "modal");
    cancelButton.setAttribute("data-target", "#cancelModal");
    cancelButton.innerHTML = "<u> Cancelar consulta </u>";
    setcancelButtonListener(cancelButton);

    return cancelButton;
}

//*************************************************
// MARK: - Listeners configuration
//*************************************************
function setcancelButtonListener(cancelButton) {
    cancelButton.addEventListener("click", function () {
        const cancelButtonID = cancelButton.getAttribute("id");
        const appointmentId = cancelButtonID.replace("cancelButton", "");

        const confirmButton = document.getElementById(
            "confirmButton" + appointmentId
        );
        confirmButton.disabled = true;
        confirmButton.classList.remove("text-primary");
        confirmButton.textContent = "Finalizar consulta";

        for (i in appointmentList) {
            if (appointmentList[i].id == appointmentId) {
                selectedAppointment = appointmentList[i];
                console.log(selectedAppointment);
            }
        }
    });
}

function setConfirmButtonListener(confirmButton) {
    confirmButton.addEventListener("click", function () {
        confirmButtonID = confirmButton.getAttribute("id");
        const appointmentId = confirmButtonID.replace("confirmButton", "");
        confirmButton.disabled = true;
        confirmButton.textContent = "Consulta finalizada";
        confirmButton.classList.remove("text-primary");

        const cancelButton = document.getElementById(
            "cancelButton" + appointmentId
        );
        cancelButton.disabled = true;
        cancelButton.classList.remove("text-danger");
        cancelButton.textContent = "Cancelar consulta";

        for (i in appointmentList) {
            if (appointmentList[i].id == appointmentId) {
                selectedAppointment = appointmentList[i];
                console.log(selectedAppointment);
            }
        }

        updateAppointmentRequest('DONE');
    });
}

function cancelAppointment() {
    cancelAppointmentRequest();
    cancelButton = document.getElementById(
        "cancelButton" + selectedAppointment.id
    );
    cancelButton.textContent = "Consulta cancelada";
    cancelButton.classList.remove("text-danger");
    cancelButton.disabled = true;
}

//*************************************************
// MARK: - Requests
//*************************************************
function getAppointmentsRequest() {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://54.232.147.115/appointment/', true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function () {
        var response = JSON.parse(this.response);

        response.forEach((appointment) => {
            if (appointment.status == "ACTIVE") {
                createAppointmentItem(appointment);
            }
        })
        console.log(response);
    }

    request.send();
}

function updateAppointmentRequest(newStatus) {
    var request = new XMLHttpRequest();
    request.open('PUT', 'http://54.232.147.115/appointment/?appointment_id=' + selectedAppointment.id, true);
    request.setRequestHeader('Content-Type', 'application/json');

    const params = {
        "doctor": selectedAppointment.doctor.id,
        "patient": selectedAppointment.patient.id,
        "start": selectedAppointment.startDate,
        "end": selectedAppointment.endDate,
        "address": selectedAppointment.address,
        "extra_data": "",
        "status": newStatus,
        "prescription": selectedAppointment.prescription
    }

    request.onload = function () {
        var response = JSON.parse(this.response);

        console.log(response);
    }

    request.send(JSON.stringify(params));

}

function zeroPad(n) {
    if (n < 10) {
        return `0${n}`
    }
    return `${n}`
}