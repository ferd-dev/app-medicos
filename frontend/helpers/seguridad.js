const navLogin = document.querySelectorAll('.navLogin');
const navSalir = document.querySelectorAll('.navSalir');
const navPerfil = document.querySelectorAll('.navPerfil');

export function verificarToken() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
    }
    return token;
}

export function cerrarSesion() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    verificarToken();
}

