// We need to wait DOM to load before calling other functions
document.addEventListener('DOMContentLoaded', init, false);

// Create a request variable and assign a new XMLHttpRequest object to it.
let selectedAppointment;

function init() {
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
// MARK: - Requests
//*************************************************
async function getAppointmentsRequest(clientId) {
    try {
        const appointments = await ApiClient.get(`appointment/${clientId}`);
        return appointments.map(result => new Appointment(result.id, result.doctor.name, formatDateString(result.start, result.end)));
    }
    catch {
        // Offline fallback
        const mocked = [
            new Appointment('5014', 'Beatriz Ribeiro', '18:30-18:50'),
            new Appointment('5015', 'Joana Telles', '19:00-19:30'),
            new Appointment('5016', 'Marta Nascimenton', '19:30-20:00'),
            new Appointment('5017', 'Orlando Wender', '20:30-21:00')
        ]
        return mocked
    }
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
        return `${date.getDate()}/${zeroPad(date.getMonth()+ 1) }/${date.getFullYear() - 2000}`
    }

    const formatHour = (date) => {
        const hours = zeroPad(date.getHours())
        const minutes = zeroPad(date.getMinutes())
        return `${hours}:${minutes}`
    }

    return `${formatDay(dateStart)} - ${formatHour(dateStart)} às ${formatHour(dateEnd)}`
}