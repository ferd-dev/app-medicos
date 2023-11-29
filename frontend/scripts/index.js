import { verificarToken, cerrarSesion } from '../helpers/seguridad.js';

const url = "http://localhost:3000";
const navSalir = document.querySelectorAll('.navSalir')

document.addEventListener("DOMContentLoaded",  async() => {
    // verificarToken();
    try {
        const clinicas = await obtenerClinicas();
        mostrarClinicas(clinicas);  

        const medicos = await obtenerMedicos();
        console.log(medicos);
        mostrarMedicos(medicos);
    } catch (error) {
        console.log(error);   
    }
});

navSalir.forEach(element => { element.addEventListener('click', salir);});

function salir() {
    cerrarSesion();
}

async function obtenerClinicas() {
    try {
        const response = await fetch(`${url}/clinicas?cantidad=4`);
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
    const contenedorClinicas = document.getElementById('contenedorClinicas');
    let html = '';
    clinicas.forEach(clinica => {
        html += `<div class="col-6 col-lg-3" data-aos="fade-up" data-aos-delay="500">
                    <div class="box-feature">
                        <span class="flaticon-building"></span>
                        <h3 class="mb-3">${clinica.nombre.toUpperCase()}</h3>
                        <hr>
                        <p>${clinica.departamento.toUpperCase()} - ${clinica.municipio.toUpperCase()}</p>
                        <p>${clinica.direccion.toUpperCase()}</p>
                        <p><a class="learn-more">Tel/Cel: ${clinica.telefono}</a></p>
                    </div>
                </div>`;
    });
    contenedorClinicas.innerHTML = html;
}

async function obtenerMedicos() {
    try {
        const response = await fetch(`${url}/medicos?cantidad=3`);
        if (!response.ok) {
            throw new Error('Error al obtener los medicos');
        }
        const data = await response.json();
        
        return data.data;
    } catch (error) {
        throw error;
    }
}

function mostrarMedicos(medicos) {
    const contenedorMedicos = document.getElementById('contenedorMedicos');
    let html = '<div class="row">';
    medicos.forEach(medico => {
        html += `<div class="item col-4">
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
                        <h3 class="h5 text-primary mb-4"><a href="./medico.html?id_medico=${medico.id_medico}">${medico.nombre} ${medico.apellidos}</a></h3>
                        
                        <p class="text-black-50"><strong>Años de experiencia:</strong> ${medico.anios_experiencia ? medico.anios_experiencia + 'años' :'Sin experiencia' } </p>
                        <p class="text-black-50"><strong>Especialidad:</strong> ${medico.especialidad}</p>
                        <p class="text-black-50"><strong>Lugar de trabajo:</strong> ${medico.clinica}</p>
                        <hr>
                        <div class="text-center">
                            <a href="./medico.html?id_medico=${medico.id_medico}" class="btn btn-primary btn-sm py-1 px-3">Ver perfil</a>
                        </div>
                    </div>
                </div>`;
    });
    html += '</div>';
    contenedorMedicos.innerHTML = html;
}