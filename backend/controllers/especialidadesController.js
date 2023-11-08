const Especialidad = require('../models/Especialidad');
let especialidades = [];

class EspecialidadesController{
    constructor(){
        this.generarEspecialidades();
    }

    getEspecialidades(req, res){
        res.send(especialidades);
    }

    getEspecialidad(req, res){
        const { id } = req.params;
        const especialidad = especialidades.find((especialidad) => especialidad.id === parseInt(id));
        res.send(especialidad);
    }

    crearEspecialidad(req, res){
        const { body } = req;
        const id = parseInt(body.id)
        const newEspecialidad = new Especialidad(
            id,
            body.nombre,
            body.descripcion,
            body.estado
        );
        especialidades.push(newEspecialidad);
        res.send(newEspecialidad);
    }

    actualizarEspecialidad(req, res){
        const { id } = req.params;
        const { body } = req;
        const index = especialidades.findIndex((especialidad) => especialidad.id === parseInt(id));
        especialidades[index].nombre = body.nombre;
        especialidades[index].descripcion = body.descripcion;
        especialidades[index].estado = body.estado;
        res.send(especialidades[index]);
    }

    eliminarEspecialidad(req, res){
        const { id } = req.params;
        const index = especialidades.findIndex((especialidad) => especialidad.id === parseInt(id));
        especialidades.splice(index, 1);
        res.send({ message: 'Especialidad eliminada' });
    }

    generarEspecialidades() {
        let especialidadesMedicas = [
            {
                id: 1,
                nombre: "Cardiología",
                descripcion: "Especialidad médica que se encarga del diagnóstico y tratamiento de enfermedades del corazón y del aparato circulatorio.",
                estado: true
            },
            {
                id: 2,
                nombre: "Dermatología",
                descripcion: "Especialidad médica que se dedica al estudio de la piel, sus estructuras, funciones y enfermedades.",
                estado: true
            },
            {
                id: 3,
                nombre: "Oftalmología",
                descripcion: "Especialidad médica que se ocupa del diagnóstico y tratamiento de las enfermedades del ojo y estructuras relacionadas.",
                estado: false
            },
            {
                id: 4,
                nombre: "Ginecología y Obstetricia",
                descripcion: "Especialidad médica que se enfoca en la salud de la mujer, el sistema reproductivo y el embarazo.",
                estado: true
            },
            {
                id: 5,
                nombre: "Traumatología y Ortopedia",
                descripcion: "Especialidad médica que se encarga del diagnóstico y tratamiento de lesiones y enfermedades del sistema musculoesquelético.",
                estado: false
            }
        ];

        for(let i = 0; i < especialidadesMedicas.length; i++){
            const especialidad = new Especialidad(
                especialidadesMedicas[i].id,
                especialidadesMedicas[i].nombre,
                especialidadesMedicas[i].descripcion,
                especialidadesMedicas[i].estado
            );
            especialidades.push(especialidad);
        }

    }
}

module.exports = EspecialidadesController;
