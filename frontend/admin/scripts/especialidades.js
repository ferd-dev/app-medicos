const URL = "http://localhost:3000";
let tabla;

document.addEventListener("DOMContentLoaded", async () => {
    try {
        verificarAccesso();
        await listarEspecialidades();
        let frmEspecialidades = document.getElementById("frmEspecialidades");
        frmEspecialidades.addEventListener("submit", guardar);
        
    } catch (error) {
        console.error("Error al obtener las especialidades:", error);
    }
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

async function listarEspecialidades() {
    const response = await fetch(`${URL}/especialidades`);
    const data = await response.json();
    // console.log(data);
    let num = 1;
    const datos = data.data.map((especialidad) => [
        num++,
        especialidad.nombre,
        especialidad.descripcion,
        `<button onclick="cambiarEstado(${especialidad.id}, ${especialidad.activo })" class="btn btn-sm btn-${especialidad.activo ? "success" : "danger"
        }">
            ${especialidad.activo ? "Activo" : "Inactivo"}
        </button>`,
        `<button class="btn btn-warning" onclick="editar(${especialidad.id})"><i class="fas fa-pencil-alt"></i></button>`,
    ]);

    // console.log(datos);

    let tablaEspecialidades = document.getElementById("tabla-especialidades");

    tabla = $(tablaEspecialidades).dataTable({
        data: datos,
        columns: [
            { title: "#", className: "text-center" },
            { title: "Nombre" },
            { title: "Descripción" },
            { title: "Estado" },
            { title: "Opciones" },
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
            
        // order: [[1, "asc"]],
    }).DataTable();
}

async function cambiarEstado(id, estado) {
    try {
        let res;
        if (estado) {
            const response = await fetch(`${URL}/especialidades/desactivar/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            res = data;
        } else {
            const response = await fetch(`${URL}/especialidades/activar/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            res = data;
        }
        
        if (res.state) {
            await listarEspecialidades();
            mensaje(res.message, "success");
        } else {
            mensaje(res.error, "error");
        }
    } catch (error) {
        console.error("Error al cambiar el estado de la especialidad:", error);
    }
}

async function editar(id) {
    mostrarFormulario(true);
    const response = await fetch(`${URL}/especialidades/${id}`);
    const data = await response.json();
    const { especialidad } = data;
    document.getElementById("nombre").value = especialidad.nombre;
    document.getElementById("descripcion").value = especialidad.descripcion;
    document.getElementById("id").value = especialidad.id;

    let btnFrom = document.getElementById("btnFrom");
    let tituloForm = document.getElementById("tituloForm");
    btnFrom.innerHTML = "Actualizar";
    tituloForm.innerHTML = "Actualizar especialidad";

}

async function guardar(e) {
    e.preventDefault();
    const id = document.getElementById("id").value;
    const nombre = document.getElementById("nombre").value;
    const descripcion = document.getElementById("descripcion").value;
    const body = {
        nombre,
        descripcion,
    };

    let res;
    if (id) {
        const response = await fetch(`${URL}/especialidades/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();
        res = data;
    } else {
        const response = await fetch(`${URL}/especialidades`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();
        res = data;
    }

    if (res.state) {
        await listarEspecialidades();
        
        mensaje(res.message, "success");
        mostrarFormulario(false);
        document.getElementById("frmEspecialidades").reset();
    } else {
        mensaje(res.error, "error");
    }
}

function mostrarFormulario(bandera) {
    let cardEspecialidades = document.getElementById("card-especialidades");
    let formEspecialidades = document.getElementById("form-especialidades");
    let btnFrom = document.getElementById("btnFrom");
    let tituloForm = document.getElementById("tituloForm");
    let id = document.getElementById("id").value
    
    if (bandera) {
        cardEspecialidades.style.display = "none";
        formEspecialidades.style.display = "block";
        if (id) {
            btnFrom.innerHTML = "Actualizar";
            tituloForm.innerHTML = "Actualizar especialidad";
        } else {
            btnFrom.innerHTML = "Guardar";
            tituloForm.innerHTML = "Nueva especialidad";
        }
        
    } else {
        cardEspecialidades.style.display = "block";
        formEspecialidades.style.display = "none";
        document.getElementById("id").value = "";
        document.getElementById("frmEspecialidades").reset();
    }
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
