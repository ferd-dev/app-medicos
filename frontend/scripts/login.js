const URL = 'http://localhost:3000';
const btnLogin = document.getElementById("btnLogin");
const btnRegistro = document.getElementById("btnRegistro");
const contentFrmLogin = document.getElementById('contentFrmLogin');
const contentFrmRegistro = document.getElementById('contentFrmRegistro');
const frmRegistro = document.getElementById('frmRegistro');
const frmLogin = document.getElementById('frmLogin');

document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    if (token) {
        window.location.href = 'index.html';
    }
});

frmLogin.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);

    const data = {
        usuario: formData.get('usuario'),
        password: formData.get('password'),
    };

    fetch(URL+'/usuario/iniciar-sesion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }).then(res => res.json())
        .then(data => {
            // console.log(data);
            if (data.success) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('id_usuario', data.data.id_usuario);
                if (data.data.id_medico) {
                    localStorage.setItem('id_medico', data.data.id_medico);
                }
                localStorage.setItem('datosUsuario', JSON.stringify(data.data.datosUsuario));
                
                Swal.fire("Inicio de sesión exitoso",'',"success").then(() => {
                    if (data.data.datosUsuario.rol == 'medi') {
                        window.location.href = "perfil.html";
                    } else if (data.data.datosUsuario.rol == 'user'){
                        window.location.href = "index.html";
                    } else if (data.data.datosUsuario.rol == 'admin'){
                        window.location.href = "./admin/index.html";
                    }
                });
            } else {
                Swal.fire("Error",data.message,"error");
            }
        })
        .catch(err => console.log(err));
});

frmRegistro.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);

    let password = formData.get('password');
    let password2 = formData.get('password2');

    if (password !== password2) {
        Swal.fire("Las contraseñas no coinciden");
        return;
    }

    const data = {
        nombre: formData.get('nombre'),
        apellidos: formData.get('apellidos'),
        usuario: formData.get('usuario'),
        correo: formData.get('correo'),
        password: formData.get('password'),
        rol: formData.get('rol')
    };

    // console.log(data);
    fetch(URL+'/usuario/registrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }).then(res => res.json())
        .then(data => {
            // console.log(data);
            if (data.success) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('id_usuario', data.data.id_usuario);
                if (data.data.id_medico) {
                    localStorage.setItem('id_medico', data.data.id_medico);
                }
                localStorage.setItem('datosUsuario', JSON.stringify(data.data.datosUsuario));
                
                Swal.fire("Registro exitoso",data.message,"success").then(() => {
                    if (data.data.id_medico) {
                        window.location.href = "perfil.html";
                    } else {
                        window.location.href = "index.html";
                    }
                });
            } else {
                Swal.fire("Error",data.message,"error");
            }
        })
        .catch(err => console.log(err));
});

btnLogin.addEventListener('click', mostrarFrmLogin);
btnRegistro.addEventListener('click', mostrarFrmRegistro);

function mostrarFrmLogin() {
    contentFrmLogin.style.display = 'block';
    contentFrmRegistro.style.display = 'none';

    btnRegistro.classList.remove('btn-primary');
    btnRegistro.classList.remove('py-3');
    btnRegistro.classList.add('btn-dark');
    btnRegistro.classList.add('py-2');
    btnLogin.classList.remove('btn-dark');
    btnLogin.classList.remove('py-2');
    btnLogin.classList.add('btn-primary');
    btnLogin.classList.add('py-3');
}

function mostrarFrmRegistro() {
    contentFrmLogin.style.display = 'none';
    contentFrmRegistro.style.display = 'block';

    btnLogin.classList.remove('btn-primary');
    btnLogin.classList.remove('py-3');
    btnLogin.classList.add('btn-dark');
    btnLogin.classList.add('py-2');
    btnRegistro.classList.remove('btn-dark');
    btnRegistro.classList.remove('py-2');
    btnRegistro.classList.add('btn-primary');
    btnRegistro.classList.add('py-3');
}