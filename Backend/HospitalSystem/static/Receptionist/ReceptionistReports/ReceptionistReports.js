// We need to wait DOM to load before calling other functions
document.addEventListener('DOMContentLoaded', init, false);

var reportType;

function init() {
    document.getElementById('generateReportButton').addEventListener('click', function() {
        generateReport();
    });
}

function generateReport() {
    var selectedReport = document.getElementById('reportList').value;
    var reportURL;

    if (selectedReport == "Número total de consultas por ano") {
        reportURL = "http://54.232.147.115/report/?report_type=1"
    } else if (selectedReport == "Número de consultas por mês em 2021") {
        reportURL = "http://54.232.147.115/report/?report_type=2&year=2021"
    } else if (selectedReport == "Médicos mais requisitados") {
        reportURL = "http://54.232.147.115/report/?report_type=3"
    }
    reportType = selectedReport;
    document.getElementById('textBoxForm').value = "";

    console.log(selectedReport);

    var request = new XMLHttpRequest();
    request.open('GET', reportURL, true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function() {
        var response = JSON.parse(this.response);

        selectReportResponse(response);
        console.log(response);
    }

    request.send();
}

function selectReportResponse(response) {
    if (reportType == "Número total de consultas por ano") {
        parseTotalAppointmentsReport(response);
    } else if (reportType == "Número de consultas por mês em 2021") {
        parseMonthlyAppointmentsReport(response);
    } else if (reportType == "Médicos mais requisitados") {
        parseRequestedDoctorsReport(response);
    }
}

function parseTotalAppointmentsReport(json) {

    const textBox = document.getElementById('textBoxForm');
    
    
    for (const report_result of json.report_results){
        const yearCount = report_result.yearly_count;
        const year = report_result.year;

        textBox.value += `Ano: ${year}\n Número de consultas realizadas em ${year} : ${yearCount}\n`
    }
}

function parseMonthlyAppointmentsReport(json) {
    const months = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
    ]
    const textBox = document.getElementById('textBoxForm');

    textBox.value += "Número de consultas realizadas por mês em 2021 \r\n \r\n";

    for (i in json.report_results) {
        textBox.value += months[i] + ": " + json.report_results[i] + "\r\n";
    }
}

function parseRequestedDoctorsReport(json) {
    const textBox = document.getElementById('textBoxForm');

    textBox.value += "Médicos mais requisitados \r \n";

    for (i = 0; i < 3 && i < json.report_results.length; i ++) {
        const doctorName = json.report_results[i].name;
        const appointmentsCount = json.report_results[i].appointments_count;

        textBox.value += "Nome do médico: " + doctorName + "\r\n";
        textBox.value += "Número de consultas realizadas: " + appointmentsCount + "\r\n \r\n";
    }
}