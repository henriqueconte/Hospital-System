// We need to wait DOM to load before calling other functions
document.addEventListener('DOMContentLoaded', init, false);

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
    
    console.log(selectedReport);

    var request = new XMLHttpRequest();
    request.open('GET', reportURL, true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function() {
        var response = JSON.parse(this.response);

        console.log(response);
    }

    request.send();
}