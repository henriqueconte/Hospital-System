// We need to wait DOM to load before calling other functions
document.addEventListener("DOMContentLoaded", init, false);

// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();
var selectedAppointment;

function init() {
  // Cancel appointment
  document
    .getElementById("cancelAppointmentButton")
    .addEventListener("click", function () {
      cancelAppointment();
    });

  getAppointmentsRequest().then((s) => {
    createAppointmentItem(s);
    console.log(s);
  });
}

//*************************************************
// MARK: - Layout creation
//*************************************************
function createAppointmentItem(appointment) {
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
  patientNameTd.textContent = "Antonio Ferreira";
  doctorNameTd.textContent = appointment.doctorName;
  hourTd.textContent = appointment.hour;

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

    selectedAppointment = new Appointment(appointmentId, "", "");
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

    selectedAppointment = new Appointment(appointmentId, "", "");

    finishAppointmentRequest();
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
function cancelAppointmentRequest() {
  // TODO: Implement request to cancel an appointment
}

async function getAppointmentsRequest() {
  try {
    const appointments = (
      await ApiClient.get(
        `appointment?user_type=RECEPTIONIST&appointment_status=FINISHED`
      )
    ).map(
      (appointment) =>
        new Appointment(appointment.id, appointment.doctor.name, data.start)
    );

    console.log(appointments);

    return appointments;
  } catch {
    // offline fallback
    testAppointment1 = new Appointment("5011", "Amanda Pires", "12:10-12:30");
    testAppointment2 = new Appointment(
      "5012",
      "Carlos Hickmann",
      "14:30-15:30"
    );
    testAppointment3 = new Appointment(
      "5013",
      "João Nascimento",
      "11:30-11:45"
    );
    testAppointment4 = new Appointment(
      "5014",
      "Beatriz Ribeiro",
      "18:30-18:50"
    );

    testAppointment5 = new Appointment("5015", "Joana Telles", "19:00-19:30");
    testAppointment6 = new Appointment(
      "5016",
      "Marta Nascimenton",
      "19:30-20:00"
    );

    testAppointment7 = new Appointment("5017", "Orlando Wender", "20:30-21:00");

    return [
      testAppointment1,
      testAppointment2,
      testAppointment3,
      testAppointment4,
      testAppointment5,
      testAppointment6,
      testAppointment7,
    ];
  }
}

function finishAppointmentRequest() {
  // TODO: Implement request to update appointment status to "Finished"
}
