import { mostrarEnlaces, cerrarSesion } from '../helpers/seguridad.js';

const url = "http://localhost:3000";

document.addEventListener("DOMContentLoaded",  async() => {
    mostrarEnlaces();
    try {
        const clinicas = await obtenerClinicas();
        mostrarClinicas(clinicas);  
        const especialidades = await obtenerEspecialidades();
        // console.log(especialidades);
        mostrarEspecialidades(especialidades);  

        const medicos = await obtenerMedicos();
        // console.log(medicos);
        mostrarMedicos(medicos);
    } catch (error) {
        console.log(error);   
    }
});

const selectEspecialidad = document.getElementById('id_especialidad');
const selectClinica = document.getElementById('id_clinica');
const selectAniosExperiencia = document.getElementById('anios_experiencia');
const selectDepartamento = document.getElementById('departamento');

selectEspecialidad.addEventListener('change', async function() {
    const medicos = await obtenerMedicos();
    mostrarMedicos(medicos);
});

selectClinica.addEventListener('change', async function() {
    const medicos = await obtenerMedicos();
    mostrarMedicos(medicos);
});

selectAniosExperiencia.addEventListener('change', async function() {
    const medicos = await obtenerMedicos();
    mostrarMedicos(medicos);
});

selectDepartamento.addEventListener('change', async function() {
    const medicos = await obtenerMedicos();
    mostrarMedicos(medicos);
});

async function obtenerMedicos() {
    try {
        let id_especialidad = document.getElementById('id_especialidad').value;
        let id_clinica = document.getElementById('id_clinica').value;
        let anios_experiencia = document.getElementById('anios_experiencia').value;
        let departamento = document.getElementById('departamento').value;

        const response = await fetch(`${url}/medicos?orden=ASC&id_especialidad=${id_especialidad}&id_clinica=${id_clinica}&anios_experiencia=${anios_experiencia}&departamento=${departamento}`);

        if (!response.ok) {
            throw new Error('Error al obtener los médicos');
        }
        const data = await response.json();
        
        return data.data;
    } catch (error) {
        throw error;
    }
}

function mostrarMedicos(medicos) {
    const listaMedicos = document.getElementById('listaMedicos');
    let html = '';
    medicos.forEach(medico => {
        html += `
            <div class="item col-md-4 mt-3 ">
                <div class="testimonial border rounded-3 py-3 px-3">
                    <img src="./public/landing/images/perfiles/avatar.jpg" alt="Image"
                        class="img-fluid rounded-circle w-25 mb-4" />
                    <div class="rate">
                        <span class="icon-star text-warning"></span>
                        <span class="icon-star text-warning"></span>
                        <span class="icon-star text-warning"></span>
                        <span class="icon-star text-warning"></span>
                        <span class="icon-star text-warning"></span>
                    </div>
                    <h3 class="h5 text-primary mb-4">
                        <a href="./medico.html?id_medico=${medico.id_medico}"> ${medico.nombre} ${medico.apellidos}</a>
                    </h3>
                    <p class="text-black-50"><strong>Especialidad:</strong> ${medico.especialidad}</p>
                    <p class="text-black-50"><strong>Trabaja en:</strong> ${medico.clinica}</p>
                    <p class="text-black-50">
                        ${medico.anios_experiencia != null ? medico.anios_experiencia + ' años de experiencia' : 'Sin experiencia' } 
                    </p>
                    <p class="text-black-50">${medico.departamento}</p>
                    <hr>
                    <div class="text-center">
                        <a  href="./medico.html?id_medico=${medico.id_medico}" class="btn btn-primary btn-sm py-1 px-3">Ver perfil</a>
                    </div>
                </div>
            </div>
        `;
    });
    listaMedicos.innerHTML = html;
}

async function obtenerClinicas() {
    try {
        const response = await fetch(`${url}/clinicas`);
        if (!response.ok) {
            throw new Error('Error al obtener las clínicas');
        }
        const data = await response.json();
        
        return data.data;
    } catch (error) {
        throw error;
    }
}

function mostrarClinicas(clinicas) {
    const id_clinica = document.getElementById('id_clinica');
    let html = '<option value="">Todos</option>';
    clinicas.forEach(clinica => {
        html += `<option value="${clinica.id}">${clinica.nombre}</option>`;
    });
    id_clinica.innerHTML = html;
}

async function obtenerEspecialidades() {
    try {
        const response = await fetch(`${url}/especialidades`);
        if (!response.ok) {
            throw new Error('Error al obtener las especialidades');
        }
        const data = await response.json();
        
        return data.data;
    } catch (error) {
        throw error;
    }
}

function mostrarEspecialidades(especialidades) {
    const id_especialidad = document.getElementById('id_especialidad');
    let html = '<option value="">Todos</option>';
    especialidades.forEach(especialidad => {
        html += `<option value="${especialidad.id}">${especialidad.nombre}</option>`;
    });
    id_especialidad.innerHTML = html;
}

const navSalir = document.querySelectorAll('.navSalir')
navSalir.forEach(element => { element.addEventListener('click', cerrarSesion);});
