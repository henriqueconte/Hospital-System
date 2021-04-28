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
    const year = json.report_results[0].year;
    const yearCount = json.report_results[0].yearly_count;
    const textBox = document.getElementById('textBoxForm');

    textBox.value += "Ano: " + year;
    textBox.value += "\r\n";
    textBox.value += "Número de consultas realizadas em " + year + ": "+ yearCount;
    
    
}

function parseMonthlyAppointmentsReport(json) {

}

function parseRequestedDoctorsReport(json) {

}