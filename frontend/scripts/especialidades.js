import { solicitarConfirmacion, msotrarTostada, mostrarTostadaPeuquenia } from '../helpers/mostrarMensaje.js';

const apiUrl = 'http://localhost:3000/especialidades';



document.addEventListener('DOMContentLoaded', function() {
    mostrarTostadaPeuquenia('hola esta es un aprueba');
});

const frmEspecialidades = document.getElementById('frmEspecialidades');
frmEspecialidades.addEventListener('submit', function(e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;

    const data = {
        id: 10,
        nombre: nombre,
        descripcion: descripcion,
        estado: true
    };

    fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        Swal.fire(
            '¡Registrado!',
            'La especialidad ha sido registrada.',
            'success'
        );
        listar();
        frmEspecialidades.reset();
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

function listar() {
    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        const especialidades = data;
        let html = `<tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Estado</th>
                        <th>Opciones</th>
                    </tr>`
        especialidades.forEach(especialidad => {
            html += `
            <tr>
                <td>${especialidad.nombre}</td>
                <td>${especialidad.descripcion}</td>
                <td>
                    ${especialidad.estado == true 
                        ? '<div class="badge badge-success">Activo</div>' 
                        : '<div class="badge badge-danger">No Activo</div>'
                    }
                    
                </td>
                <td>
                    <a href="#" class="btn btn-warning">
                        <i class="fas fa-pencil-alt"></i>
                    </a>
                    <a href="#" class="btn btn-danger" onclick="eliminar(${especialidad.id})">
                        <i class="far fa-trash-alt"></i>
                    </a>
                </td>
            </tr>
            `;
        });
        document.getElementById('tabla-especialidades').innerHTML = html;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


function eliminar(id) {
    Swal.fire({
        title: '¿Estás seguro de eliminar la especialidad?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#dc3545',
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(apiUrl + '/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(response => {
                if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                Swal.fire(
                    '¡Eliminado!',
                    'La especialidad ha sido eliminada.',
                    'success'
                );
                listar();
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
      })
    
}