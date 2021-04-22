
// We need to wait DOM to load before calling other functions
document.addEventListener('DOMContentLoaded', init, false);

function init() {
	document.getElementById("LoginButton").addEventListener("click", function() {
        tryLogin()
    });
}

function tryLogin() {

}