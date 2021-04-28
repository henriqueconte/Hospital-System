// We need to wait DOM to load before calling other functions
document.addEventListener('DOMContentLoaded', init, false);

// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();
var selectedAppointment;
var appointmentList = [];
const loggedUser = sessionStorage.getItem('loggedUser');

function init() {

    // Cancel appointment
    document.getElementById("cancelAppointmentButton").addEventListener("click", function() {
        cancelAppointment();
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
    const detailsTd = document.createElement("td");

    const detailsButton = createDetailsButton(appointment.id);

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
    tr.setAttribute("doctorName", appointment.doctor.name);
    tr.setAttribute("appointmentHour", hourTd.textContent);
    tr.setAttribute('address', appointment.address);

    appointmentsTableBody.appendChild(tr);
    tr.appendChild(doctorNameTd);
    tr.appendChild(hourTd);
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
        const appointmentAddress = editingAppointment.getAttribute('address');

        document.getElementById("doctorNameForm").textContent = doctorName;
        document.getElementById("appointmentHourForm").textContent = appointmentHour;
        document.getElementById('appointmentLocationForm').textContent = appointmentAddress;

        // selectedAppointment = new Appointment(appointmentId, doctorName, appointmentHour)
        
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
    detailsButton = document.getElementById("seeDetailsButton" + selectedAppointment.id);
    detailsButton.textContent = "Consulta cancelada";
    detailsButton.disabled = true;
}

//*************************************************
// MARK: - Requests
//*************************************************
function cancelAppointmentRequest() {
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
        "status" : "CANCELLED",
        "prescription" : selectedAppointment.prescription
    }

    request.onload = function() {
        var response = JSON.parse(this.response);

        console.log(response);
    }

    request.send(JSON.stringify(params));
}

function getAppointmentsRequest() {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://54.232.147.115/appointment/?user_id=' + loggedUser.id, true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function() {
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