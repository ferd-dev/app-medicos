import { mostrarEnlaces, cerrarSesion } from '../helpers/seguridad.js';
const url = "http://localhost:3000";

document.addEventListener("DOMContentLoaded",  async() => {
    mostrarEnlaces();
    try {
        const clinicas = await obtenerClinicas();
        // console.log(clinicas);
        mostrarClinicas(clinicas);  
    } catch (error) {
        console.log(error);   
    }
});

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

const navSalir = document.querySelectorAll('.navSalir')
navSalir.forEach(element => { element.addEventListener('click', salir);});

function salir() {
    cerrarSesion();
}