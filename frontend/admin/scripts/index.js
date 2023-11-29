let URL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", function () {
    obtenerMedicos();
    obtenerUsuarios();
    obtenerEspecialidades();
    obtenerClinicas();
});

function obtenerMedicos() {
    fetch(URL + "/usuario/admin/usuarios/medicos")
        .then((res) => res.json())
        .then((data) => {
            document.getElementById("medicos").innerHTML = data.data.length;
        })
        .catch((error) => console.error(error));
}

function obtenerUsuarios() {
    fetch(URL + "/usuario/admin/usuarios")
        .then((res) => res.json())
        .then((data) => {
            document.getElementById("usuarios").innerHTML = data.data.length;
        })
        .catch((error) => console.error(error));
}

function obtenerEspecialidades() {
    fetch(URL + "/especialidades")
        .then((res) => res.json())
        .then((data) => {
            document.getElementById("especialidades").innerHTML = data.data.length;
        })
        .catch((error) => console.error(error));
}

function obtenerClinicas() {
    fetch(URL + "/clinicas/admin")
        .then((res) => res.json())
        .then((data) => {
            document.getElementById("clinicas").innerHTML = data.data.length;
        })
        .catch((error) => console.error(error));
}