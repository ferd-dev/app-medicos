const navLogin = document.querySelectorAll('.navLogin');
const navPerfil = document.querySelectorAll('.navPerfil');
const navSalir = document.querySelectorAll('.navSalir');

export function mostrarEnlaces() {
    const token = localStorage.getItem('token');
    const id_medico = localStorage.getItem('id_medico');
    if (token) {
        navLogin.forEach(element => { element.style.display = 'none';});
        if (id_medico) {
            navPerfil.forEach(element => { element.style.display = 'block';});
        } else {
            navPerfil.forEach(element => { element.style.display = 'none';});
        }
        navSalir.forEach(element => { element.style.display = 'block';});
    } else {
        navLogin.forEach(element => { element.style.display = 'block';});
        navSalir.forEach(element => { element.style.display = 'none';});
    }
}

export function verificarAccesso() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
    }
    return token;
}

export function cerrarSesion() {
    localStorage.removeItem('id_medico');
    localStorage.removeItem('id_usuario');
    localStorage.removeItem('token');
    localStorage.removeItem('datosUsuario');
    mostrarEnlaces();
}

