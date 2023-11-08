// URL de la API que quieres consultar
const apiUrl = 'http://localhost:3000/medicos';

// Haciendo una solicitud GET
fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        const medicos = data;
        let html = `<tr>
                        <th>Usuario</th>
                        <th>Especialidad</th>
                        <th>Años de expreciencia</th>
                        <th>Licencia</th>
                        <th>Estado</th>
                        <th>Opciones</th>
                    </tr>`
        medicos.forEach(medico => {
            html += `
            <tr>
                <td>${medico.usuario_id}</td>
                <td>${medico.especialidad_id}</td>
                <td>${medico.anios_experiencia} años</td>
                <td>${medico.licencia}</td>
                <td>
                    ${medico.estado == true 
                        ? '<div class="badge badge-success">Activo</div>' 
                        : '<div class="badge badge-danger">No Activo</div>'
                    }
                    
                </td>
                <td>
                    <a href="#" class="btn btn-warning">
                        <i class="fas fa-pencil-alt"></i>
                    </a>
                    <a href="#" class="btn btn-danger">
                        <i class="far fa-trash-alt"></i>
                    </a>
                </td>
            </tr>
            `;
        });
        document.getElementById('tabla-medicos').innerHTML = html;
    })
    .catch(error => {
        console.error('Error:', error);
    });
