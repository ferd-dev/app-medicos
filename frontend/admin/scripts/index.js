let URL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", function () {
    verificarAccesso();
    obtenerMedicos();
    obtenerUsuarios();
    obtenerEspecialidades();
    obtenerClinicas();
});

function verificarAccesso() {
    const token = localStorage.getItem('token');
    if (!token) { window.location.href = '../index.html'; }

    let datosUsuario = localStorage.getItem('datosUsuario');
    datosUsuario = JSON.parse(datosUsuario);
    if (datosUsuario.rol != 'admin') {
        window.location.href = '../index.html';
    }

    document.getElementById("nombreUsuario").innerHTML = datosUsuario.nombre + " " + datosUsuario.apellidos;
}

function salir() {
    localStorage.removeItem('token');
    localStorage.removeItem('id_usuario');
    localStorage.removeItem('datosUsuario');
    window.location.href = '../index.html';
}

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