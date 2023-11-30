import { mostrarEnlaces, cerrarSesion } from '../helpers/seguridad.js';
let URL = 'http://localhost:3000';
const ulDatosUsuario = document.getElementById('ulDatosUsuario');
const rowDatosMedicoImagen = document.getElementById('rowDatosMedicoImagen');
const rowDatosMedico = document.getElementById('rowDatosMedico');
const btnEditarUsuario = document.getElementById('btnEditarUsuario');
const btnEditarMedico = document.getElementById('btnEditarMedico');
const editarUsuarioModal = document.getElementById('editarUsuarioModal');
const editarMedicoModal = document.getElementById('editarMedicoModal');
const frmEditarUsuario = document.getElementById('frmEditarUsuario');
const frmEditarMedico = document.getElementById('frmEditarMedico');

function verificarAccesso() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
    } else {
        let datosUsuario = localStorage.getItem('datosUsuario');
        datosUsuario = JSON.parse(datosUsuario);
        if (datosUsuario.rol != 'medi') {
            window.location.href = 'login.html';
        }
    }

}

frmEditarMedico.addEventListener('submit', function (evento) {
    evento.preventDefault();
    let token = localStorage.getItem('token');
    let id_medico = localStorage.getItem('id_medico');
    let id_especialidad = document.getElementById('id_especialidad').value;
    let id_clinica = document.getElementById('id_clinica').value;
    let anios_experiencia = document.getElementById('anios_experiencia').value;
    let licencia = document.getElementById('licencia').value;
    let pais = document.getElementById('pais').value;
    let departamento = document.getElementById('departamento').value;
    let ciudad = document.getElementById('ciudad').value;
    let fecha_nacimiento = document.getElementById('fecha_nacimiento').value;

    let url = `${URL}/medicos/editar/${id_medico}`;
    let parametros = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({
            id_especialidad,
            id_clinica,
            anios_experiencia,
            licencia,
            pais,
            departamento,
            ciudad,
            fecha_nacimiento
        })
    };

    fetch(url, parametros)
        .then(respuesta => respuesta.json())
        .then(respuesta => {
            // console.log(respuesta);
            if(respuesta.success){
                cargarDatosMedico();
                let modal = bootstrap.Modal.getInstance(editarMedicoModal);
                modal.hide();
                mensaje("Datos actualizados correctamente")
            }
        })
        .catch(error => console.log(error));
});
                
btnEditarMedico.addEventListener('click', function () {
    let id_medico = localStorage.getItem('id_medico');
    let token = localStorage.getItem('token');
    let url = `${URL}/medicos/${id_medico}`;
    let parametros = {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    };
    fetch(url, parametros)
        .then(respuesta => respuesta.json())
        .then(respuesta => {
            let medico = respuesta.data;
            console.log(medico);
            document.getElementById('id_especialidad').value = medico.id_especialidad ?? '';
            document.getElementById('id_clinica').value = medico.id_clinica ?? '';
            document.getElementById('anios_experiencia').value = medico.anios_experiencia;
            document.getElementById('licencia').value = medico.licencia;
            document.getElementById('licencia').value = medico.licencia;
            document.getElementById('pais').value = medico.pais;
            document.getElementById('departamento').value = medico.departamento;
            document.getElementById('ciudad').value = medico.ciudad;
            document.getElementById('fecha_nacimiento').value = medico.fecha_nacimiento;
        })
        .catch(error => console.log(error));


    let modal = new bootstrap.Modal(editarMedicoModal);
    modal.show();
});

btnEditarUsuario.addEventListener('click', function () {
    let datosUsuario = localStorage.getItem('datosUsuario');
    datosUsuario = JSON.parse(datosUsuario);

    document.getElementById('nombreUsuario').value = datosUsuario.nombre;
    document.getElementById('apellidosUsuario').value = datosUsuario.apellidos;

    let modal = new bootstrap.Modal(editarUsuarioModal);
    modal.show();
});

frmEditarUsuario.addEventListener('submit', function (evento) {
    evento.preventDefault();
 
    let token = localStorage.getItem('token');
    let id_usuario = localStorage.getItem('id_usuario');
    let nombre = document.getElementById('nombreUsuario').value;
    let apellidos = document.getElementById('apellidosUsuario').value;

    let url = `${URL}/usuario/editar/${id_usuario}`;
    let parametros = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({
            nombre,
            apellidos,
        })
    };
    fetch(url, parametros)
        .then(respuesta => respuesta.json())
        .then(respuesta => {
            console.log(respuesta);
            if (respuesta.success) {
                let { nombre, apellidos } = respuesta.data;
                let datosUsuario = localStorage.getItem('datosUsuario');
                datosUsuario = JSON.parse(datosUsuario);
                datosUsuario.nombre = nombre;
                datosUsuario.apellidos = apellidos;
                localStorage.setItem('datosUsuario', JSON.stringify(datosUsuario));
                cargarDatosUsuario(datosUsuario);
                let modal = bootstrap.Modal.getInstance(editarUsuarioModal);
                modal.hide();
                mensaje("Datos actualizados correctamente")
            }
        })
        .catch(error => console.log(error));
});

document.addEventListener('DOMContentLoaded', function () {
    verificarAccesso();
    mostrarEnlaces();
    cargarPerfil();
});

function cargarPerfil() {
    let datosUsuario = localStorage.getItem('datosUsuario');
    datosUsuario = JSON.parse(datosUsuario);
    cargarDatosUsuario(datosUsuario);
    cargarDatosMedico();
    cargarEspecialidades();
    cargarClinicas();
    cargarTrabajos();
    cargarEstudios();
}

function cargarEstudios() {
    let token = localStorage.getItem('token');
    let id_medico = localStorage.getItem('id_medico');
    // console.log(id_medico);
    let url = `${URL}/estudios/medico?id_medico=${id_medico}`;
    let parametros = {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    };
    fetch(url, parametros)
        .then(respuesta => respuesta.json())
        .then(respuesta => {
            // console.log(respuesta);
            let estudios = respuesta.data;
            let html = '';
            estudios.forEach(estudio => {
                html += `
                    <li class="list-group-item">
                        ${estudio.tipo_estudio} - ${estudio.titulo} - ${estudio.intituto}
                        <button class="btn btn-sm btn-warning py-1 px-2">
                            <i class="fas fa-pen"></i>
                        </button>
                        <button class="btn btn-sm btn-danger py-1 px-2">
                            <i class="fas fa-trash"></i>
                        </button>
                    </li>
                `;
            });
            document.getElementById('listaEstudios').innerHTML = html;
        })
        .catch(error => console.log(error));
}

function cargarTrabajos() {
    let token = localStorage.getItem('token');
    let id_medico = localStorage.getItem('id_medico');
    // console.log(id_medico);
    let url = `${URL}/trabajos/medico?id_medico=${id_medico}`;
    let parametros = {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    };
    fetch(url, parametros)
        .then(respuesta => respuesta.json())
        .then(respuesta => {
            // console.log(respuesta);
            let trabajos = respuesta.data;
            let html = '';
            trabajos.forEach(trabajo => {
                html += `
                    <li class="list-group-item">
                        ${trabajo.puesto} - ${trabajo.clinica} - ${trabajo.tiempo_meses} meses
                        <button class="btn btn-sm btn-warning py-1 px-2">
                            <i class="fas fa-pen"></i>
                        </button>
                        <button class="btn btn-sm btn-danger py-1 px-2">
                            <i class="fas fa-trash"></i>
                        </button>
                    </li>
                `;
            });
            document.getElementById('listaTrabajos').innerHTML = html;
        })
        .catch(error => console.log(error));
}

function cargarClinicas() {
    let token = localStorage.getItem('token');
    let url = `${URL}/clinicas`;
    let parametros = {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    };
    fetch(url, parametros)
        .then(respuesta => respuesta.json())
        .then(respuesta => {
            // console.log(respuesta);
            let clinicas = respuesta.data;
            let html = '<option value="">Lugar de trabajo</option>';
            clinicas.forEach(clinica => {
                html += `<option value="${clinica.id}">${clinica.nombre}</option>`;
            });
            document.getElementById('id_clinica').innerHTML = html;
            document.getElementById('id_clinica2').innerHTML = html;
        })
        .catch(error => console.log(error));
}

function cargarEspecialidades() {
    let token = localStorage.getItem('token');
    let url = `${URL}/especialidades`;
    let parametros = {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    };
    fetch(url, parametros)
        .then(respuesta => respuesta.json())
        .then(respuesta => {
            // console.log(respuesta);
            let especialidades = respuesta.data;
            let html = '<option value="">Seleccione una especialidad</option>';
            especialidades.forEach(especialidad => {
                html += `<option value="${especialidad.id}">${especialidad.nombre}</option>`;
            });
            document.getElementById('id_especialidad').innerHTML = html;
        })
        .catch(error => console.log(error));
}

function cargarDatosUsuario({ nombre, apellidos, usuario, correo }) {
    let html = `
            <li class="list-group-item">
                <strong>Nombre:</strong> ${nombre} ${apellidos}
            </li>
            <li class="list-group-item">
                <strong>Nombre de usuario:</strong> ${usuario}
            </li>
            <li class="list-group-item">
                <strong>Correo</strong> ${correo}
            </li>
            <li class="list-group-item"></li>
        `;
    ulDatosUsuario.innerHTML = html;
}

function cargarDatosMedico() {
    let id_medico = localStorage.getItem('id_medico');
    let token = localStorage.getItem('token');
    let url = `${URL}/medicos/${id_medico}`;
    let parametros = {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    };
    fetch(url, parametros)
        .then(respuesta => respuesta.json())
        .then(respuesta => {
            let medico = respuesta.data;
            console.log(medico);

            let perfil = medico.fotografia !== null ? medico.fotografia : 'avatar.jpg';
            let verificado = medico.verificado 
                ? '<span class="badge bg-primary ">Si</span>' 
                : '<span class="badge bg-danger">No</span>';
            let htmlPerfil = `
                <div class="text-center">
                    <img src="./public/landing/images/perfiles/${perfil}"
                        class="img-fluid rounded-circle" width="150px">
                    ${medico.fotografia !== null ? '' : '<small class="text-danger">Sin foto de perfil</small>'}
                </div>
                <div class="col-12 col-md-6 mx-auto mb-3">
                    <input type="file" class="form-control" name="fotografia">
                </div>
            `;

            let htmlDatos = `
                <li class="list-group-item">
                    <strong>Especialidad: </strong> ${ medico.especialidad }
                </li>
                <li class="list-group-item">
                    <strong>Lugar de trabajo: </strong> ${ medico.id_clinica !== null ? medico.id_clinica : "" }
                </li>
                <li class="list-group-item">
                    <strong>Esperiencia: </strong> ${ medico.anios_experiencia !== null ? medico.anios_experiencia +' Años'  : "" } 
                </li>
                <li class="list-group-item">
                    <strong>Edad: </strong> ${ medico.fecha_nacimiento !== null ? calcularEdad(medico.fecha_nacimiento) +' Años'  : "" } 
                </li>
                <li class="list-group-item">
                    <strong>Lugar de recidencia: </strong>
                    ${ medico.pais !== null ? medico.pais : "" } - ${ medico.departamento !== null ? medico.departamento : "" } - ${ medico.ciudad !== null ? medico.ciudad : "" }
                </li>
                <li class="list-group-item">
                    <strong>Núm. de licencia: </strong>${ medico.licencia !== null ? medico.licencia.substring(0, 3) + "*******" : "" } 
                </li>
                <li class="list-group-item">
                    <strong>Vericado: </strong> ${verificado} 
                </li>
            `;
            rowDatosMedicoImagen.innerHTML = htmlPerfil;
            rowDatosMedico.innerHTML = htmlDatos;
        })
        .catch(error => console.log(error));
}

function calcularEdad(fecha) {
    const fechaNacimiento = new Date(fecha);
    const fechaActual = new Date();
    
    let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    
    // Verificar si el cumpleaños ya ha ocurrido en el año actual
    if (
        fechaActual.getMonth() < fechaNacimiento.getMonth() ||
        (fechaActual.getMonth() === fechaNacimiento.getMonth() &&
            fechaActual.getDate() < fechaNacimiento.getDate())
    ) {
      edad--;
    }
    
    return edad;
}

const navSalir = document.querySelectorAll('.navSalir')
navSalir.forEach(element => { element.addEventListener('click', salir);});

function salir() {
    cerrarSesion();
    verificarAccesso();
}

function mensaje(message, icon = "success") {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
    });
      Toast.fire({
        icon: icon,
        title: message
    });
}