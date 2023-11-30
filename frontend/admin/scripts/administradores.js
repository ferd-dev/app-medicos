let URL = "http://localhost:3000";
let tabla;

document.addEventListener("DOMContentLoaded", function () {
    verificarAccesso();
    listar();

    let frmUsuarios = document.querySelector("#frmUsuarios");
    frmUsuarios.addEventListener("submit", function (e) {
        e.preventDefault();
        let id = document.querySelector("#id").value;
        let nombre = document.querySelector("#nombre").value;
        let apellidos = document.querySelector("#apellidos").value;
        let usuario = document.querySelector("#usuario").value;
        let correo = document.querySelector("#correo").value;
        let password = document.querySelector("#password").value;

        let dataUsuario = {
            id,
            nombre,
            apellidos,
            usuario,
            correo,
            password,
            rol: "admin",
        };

        let dataUsuarioAc = {
            nombre,
            apellidos
        };

        if(id == "") {
            fetch(URL + "/usuario/admin/registrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataUsuario),
            })
                .then((res) => res.json())
                .then((data) => {
                    if(data.success) {
                        mensaje(data.message, "success");
                        tabla.ajax.reload();
                        mostrarFormulario(false);
                    } else {
                        mensaje(data.message, "error");
                    }
                    
                })
                .catch((error) => console.error(error));
        } else {
            fetch(URL + "/usuario/admin/usuarios/"+id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataUsuarioAc),
            })
                .then((res) => res.json())
                .then((data) => {
                    tabla.ajax.reload();
                    mensaje(data.message, "success");
                    mostrarFormulario(false);
                })
                .catch((error) => console.error(error));
        }
    });
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

function desactivar(id) {
    let data = {
        activo: 0
    }
    fetch(URL + "/usuario/admin/estado/"+id, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((data) => {
            tabla.ajax.reload();
            mensaje(data.message, "success");
            mostrarFormulario(false);
        })
        .catch((error) => console.error(error));
}

function activar(id) {
    let data = {
        activo: 1
    }
    fetch(URL + "/usuario/admin/estado/"+id, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((data) => {
            tabla.ajax.reload();
            mensaje(data.message, "success");
            mostrarFormulario(false);
        })
        .catch((error) => console.error(error));
}

function editar(id) {
    // console.log(id);
    mostrarFormulario(true);
    fetch(URL + "/usuario/admin/usuarios/" + id)
        .then((res) => res.json())
        .then((data) => {
            let usuario = data.data;
            // console.log(usuario);
            document.getElementById("id").value = usuario.id;
            document.getElementById("nombre").value = usuario.nombre;
            document.getElementById("apellidos").value = usuario.apellidos;
            document.getElementById("usuario").value = usuario.usuario;
            document.getElementById("usuario").disabled = true;
            document.getElementById("correo").value = usuario.correo;
            document.getElementById("correo").disabled = true;
            document.getElementById("password").disabled = true;
            document.getElementById("password").value = "********";
        })
        .catch((error) => console.error(error));

}


function listar() {
    let num = 1;
    tabla = $("#tblUsuarios").DataTable({
        ajax: {
            url: URL + "/usuario/admin/usuarios/administradores",
            method: "GET",
            dataSrc: "data",
        },
        columns: [
            { data: "id", render: (data) => num++ },
            { data: "nombre", },
            { data: "apellidos" },
            { data: "usuario" },
            { data: "correo" },
            { data: "fecha_creacion", render: (data) => mostrarFechaEnFormato(data) },
            { 
                data: "id", 
                render: (data, type, row) => {
                    const id = data;
                    const activo = row.activo;
                    if(activo == 1) {
                        return `<button type='button' class='btn btn-success btn-sm' onclick="desactivar(${id})">Activo</button>`;
                    } else {
                        return `<button type='button' class='btn btn-danger btn-sm' onclick="activar(${id})">No Activo</button>`;
                    }
                } 
            },
            {
                data: "id",
                render: function (data) {
                    return (
                        `<button class="btn btn-sm btn-warning" onclick="editar(${data})">
                            <i class="fas fa-pencil-alt"></i>
                        </button>`
                    );
                },
            },
        ],
        language: {
            url: "../helpers/datatables_es.json",
        },
        processing: true,
        processing: true,
        responsive: true,
        scrollX: false,
        bDestroy: true,
        processing: true,
    });
}

function mostrarFormulario(flag) {
    limpiarFormulario();
    let cardTablaUsuarios = document.querySelector("#cardTablaUsuarios");
    let cardFrmUsuarios = document.querySelector("#cardFrmUsuarios");
    if(flag) {
        cardTablaUsuarios.style.display = "none";
        cardFrmUsuarios.style.display = "block";
    }else {
        cardTablaUsuarios.style.display = "block";
        cardFrmUsuarios.style.display = "none";
    }
}

function limpiarFormulario() {
    document.getElementById("frmUsuarios").reset();
    document.getElementById("id").value = "";
}

function mostrarFechaEnFormato(fecha) {
    // Convertir la fecha en un objeto Date
    const fechaObjeto = new Date(fecha);
  
    // Obtener el día del mes
    const dia = fechaObjeto.getDate();
  
    // Obtener el mes (0 = enero, 1 = febrero, etc.)
    const mes = fechaObjeto.getMonth();
  
    // Obtener el año
    const año = fechaObjeto.getFullYear();
  
    // Array con los nombres de los meses
    const nombresMeses = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
  
    // Construir la fecha en el formato deseado
    const fechaFormateada = `${dia} de ${nombresMeses[mes]} de ${año}`;
  
    // Retornar la fecha formateada
    return fechaFormateada;
}

function mensaje(mensaje, icono ) {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
    });
    Toast.fire({
        icon: icono || "success",
        title: mensaje || "Ocurrió un error",
    });
}