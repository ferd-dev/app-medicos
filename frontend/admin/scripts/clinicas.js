let URL = "http://localhost:3000";
let tabla;

document.addEventListener("DOMContentLoaded", function () {
    verificarAccesso();
    listar();

    let frmClinicas = document.querySelector("#frmClinicas");
    frmClinicas.addEventListener("submit", function (e) {
        e.preventDefault();
        let id = document.querySelector("#id").value;
        let nombre = document.querySelector("#nombre").value;
        let telefono = document.querySelector("#telefono").value;
        let departamento = document.querySelector("#departamento").value;
        let municipio = document.querySelector("#municipio").value;
        let direccion = document.querySelector("#direccion").value;

        let clinica = {
            id,
            nombre,
            telefono,
            departamento,
            municipio,
            direccion
        };

        if(id == "") {
            fetch(URL + "/clinicas/admin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(clinica),
            })
                .then((res) => res.json())
                .then((data) => {
                    tabla.ajax.reload();
                    mensaje(data.message, "success");
                    mostrarFormulario(false);
                })
                .catch((error) => console.error(error));
        } else {
            fetch(URL + "/clinicas/admin/"+id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(clinica),
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

function editar(id) {
    mostrarFormulario(true);
    fetch(URL + "/clinicas/admin/" + id)
        .then((res) => res.json())
        .then((data) => {
            let clinica = data.data;
            // console.log(clinica);
            document.getElementById("id").value = clinica.id;
            document.getElementById("nombre").value = clinica.nombre;
            document.getElementById("telefono").value = clinica.telefono;
            document.getElementById("departamento").value = clinica.departamento;
            document.getElementById("municipio").value = clinica.municipio;
            document.getElementById("direccion").value = clinica.direccion;
        })
        .catch((error) => console.error(error));

}

function limpiarFormulario() {
    document.getElementById("frmClinicas").reset();
    document.getElementById("id").value = "";
}


function mostrarFormulario(flag) {
    limpiarFormulario();
    let cardTablaClinicas = document.querySelector("#cardTablaClinicas");
    let cardFrmClinicas = document.querySelector("#cardFrmClinicas");
    if(flag) {
        cardTablaClinicas.style.display = "none";
        cardFrmClinicas.style.display = "block";
    }else {
        cardTablaClinicas.style.display = "block";
        cardFrmClinicas.style.display = "none";
    }
}

function listar() {
    let num = 1;
    tabla = $("#tblClinicas").DataTable({
        ajax: {
            url: URL + "/clinicas/admin",
            method: "GET",
            dataSrc: "data",
        },
        columns: [
            { data: "id", render: (data) => num++ },
            { data: "nombre", },
            { data: "telefono" },
            { data: "departamento" },
            { data: "municipio" },
            { data: "direccion" },
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

function desactivar(id) {
    let data = {
        activo: 0
    }
    fetch(URL + "/clinicas/admin/estado/"+id, {
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
    fetch(URL + "/clinicas/admin/estado/"+id, {
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