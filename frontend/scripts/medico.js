const URL = 'http://localhost:3000';
const urlParams = new URLSearchParams(window.location.search);
const idMedico = urlParams.get('id_medico');

document.addEventListener("DOMContentLoaded",  async() => {
    try {
        const medico = await obtenerInifoMedico();
        console.log(medico);
        mostrarInfo(medico);  
    } catch (error) {
        console.log(error);   
    }
});

async function obtenerInifoMedico() {
    try {
        const response = await fetch(`${URL}/medicos/getCompleto/${idMedico}`);
        if (!response.ok) {
            throw new Error('Error al obtener la informacion del medico');
        }
        const data = await response.json();
        
        return data;
    } catch (error) {
        throw error;
    }
}

function mostrarInfo(medico) {
    document.getElementById('txtNombre').innerHTML = medico.data.nombre + ' ' + medico.data.apellidos;
    document.getElementById('txtNombreApellidos').innerHTML = medico.data.nombre + ' ' + medico.data.apellidos;
    document.getElementById('txtEspecialidad').innerHTML = medico.data.especialidad;
    document.getElementById('txtCorreo').innerHTML = medico.data.correo;
    document.getElementById('txtEdad').innerHTML = medico.data.fecha_nacimiento ? calcularEdad(medico.data.fecha_nacimiento) : 'No especificado';
    document.getElementById('txtAniosExperiencia').innerHTML = medico.data.anios_experiencia ? medico.data.anios_experiencia + ' años' : 'No especificado';
    let nacionalidad = medico.data.pais + ' - ' + medico.data.departamento + '-' + medico.data.ciudad;
    document.getElementById('txtNacionalidad').innerHTML = nacionalidad ? nacionalidad : 'No especificado';
    document.getElementById('txtClinica').innerHTML = medico.data.clinica ? '<strong>Trabaja en: </strong>'+medico.data.clinica : '';

    let html = '';
    medico.trabajos.forEach(trabajo => {
        html += `
            <li class="list-group-item">
                <i class="far fa-check-circle text-success"></i>
                ${trabajo.clinica} - ${trabajo.puesto} - del ${trabajo.anio_inicio} al ${trabajo.anio_fin}
            </li>
        `;
    });
    document.getElementById('listaTrabajos').innerHTML = html;

    let html2 = '';
    medico.estudios.forEach(estudio => {
        html2 += `
            <li class="list-group-item">
                <i class="far fa-check-circle text-success"></i>
                ${estudio.intituto} - ${estudio.tipo_estudio} - ${estudio.titulo} - del ${estudio.anio_inicio} al ${estudio.anio_fin}
            </li>
        `;
    });
    document.getElementById('listaEstudios').innerHTML = html2;
}

function calcularEdad(fecha) {
    const fechaActual = new Date();
    const fechaNacimiento = new Date(fecha);
    
    let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    
    const mesActual = fechaActual.getMonth();
    const diaActual = fechaActual.getDate();
    const mesNacimiento = fechaNacimiento.getMonth();
    const diaNacimiento = fechaNacimiento.getDate();
    
    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && diaActual < diaNacimiento)) {
      edad--;
    }
    
    return edad + ' años de edad';
}