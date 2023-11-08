const Medico = require('../models/Medico');
const medicos = [];

class MedicosController{
    constructor(){
        this.generarMedicos();
    }

    getMedicos(req, res){
        res.send(medicos);
    }

    getmedico(req, res){
        const { id } = req.params;
        const medico = medicos.find((medico) => medico.id === parseInt(id));
        res.send(medico);
    }

    crearMedico(req, res){
        const { body } = req;
        const id = parseInt(body.id);
        const usuario_id = parseInt(body.usuario_id);
        const especialidad_id = parseInt(body.id);

        const newMedico = new Medico(
            id,
            usuario_id,
            especialidad_id,
            body.fotografia,
            body.sexo,
            body.anios_experiencia,
            body.fecha_nacimiento,
            body.pais,
            body.departamento,
            body.ciudad,
            body.direccion,
            body.telefono,
            body.licencia,
            body.verificado,
            body.estado
        );
        medicos.push(newMedico);
        res.send(newMedico);
    }

    actualizarMedico(req, res){
        const { id } = req.params;
        const { body } = req;
        const usuario_id = parseInt(body.usuario_id);
        const especialidad_id = parseInt(body.especialidad_id);
        const index = medicos.findIndex((medico) => medico.id === parseInt(id));
        medicos[index].usuario_id = usuario_id || medicos[index].usuario_id;
        medicos[index].especialidad_id = especialidad_id;
        medicos[index].fotografia = body.fotografia;
        medicos[index].sexo = body.sexo;
        medicos[index].anios_experiencia = body.anios_experiencia;
        medicos[index].fecha_nacimiento = body.fecha_nacimiento;
        medicos[index].pais = body.pais;
        medicos[index].departamento = body.departamento;
        medicos[index].ciudad = body.ciudad;
        medicos[index].direccion = body.direccion;
        medicos[index].telefono = body.telefono;
        medicos[index].licencia = body.licencia;
        medicos[index].verificado = body.verificado;
        medicos[index].estado = body.estado;
        res.send(medicos[index]);
    }

    eliminarMedico(req, res){
        const { id } = req.params;
        const index = medicos.findIndex((medico) => medico.id === parseInt(id));
        medicos.splice(index, 1);
        res.send({ message: 'Medico eliminado' });
    }

    generarMedicos() {
        let medicosEjemplo = [
            {
                id: 1,
                usuario_id: 1,
                especialidad_id: 1,
                fotografia: "https://via.placeholder.com/150",
                sexo: "Femenino",
                anios_experiencia: 5,
                fecha_nacimiento: "1980-05-15",
                pais: "País 1",
                departamento: "Departamento 1",
                ciudad: "Ciudad 1",
                direccion: "Calle 123",
                telefono: "123456789",
                licencia: "M12345",
                verificado: true,
                estado: true
            },
            {
                id: 2,
                usuario_id: 2,
                especialidad_id: 2,
                fotografia: "https://via.placeholder.com/150",
                sexo: "Masculino",
                anios_experiencia: 8,
                fecha_nacimiento: "1975-08-20",
                pais: "País 2",
                departamento: "Departamento 2",
                ciudad: "Ciudad 2",
                direccion: "Avenida 456",
                telefono: "987654321",
                licencia: "M54321",
                verificado: true,
                estado: true
            },
            {
                id: 3,
                usuario_id: 3,
                especialidad_id: 3,
                fotografia: "https://via.placeholder.com/150",
                sexo: "Femenino",
                anios_experiencia: 3,
                fecha_nacimiento: "1990-03-10",
                pais: "País 3",
                departamento: "Departamento 3",
                ciudad: "Ciudad 3",
                direccion: "Plaza 789",
                telefono: "555555555",
                licencia: "M78901",
                verificado: false,
                estado: true
            },
            {
                id: 4,
                usuario_id: 4,
                especialidad_id: 4,
                fotografia: "https://via.placeholder.com/150",
                sexo: "Masculino",
                anios_experiencia: 7,
                fecha_nacimiento: "1982-12-05",
                pais: "País 4",
                departamento: "Departamento 4",
                ciudad: "Ciudad 4",
                direccion: "Paseo 567",
                telefono: "666666666",
                licencia: "M45678",
                verificado: true,
                estado: true
            },
            {
                id: 5,
                usuario_id: 5,
                especialidad_id: 5,
                fotografia: "https://via.placeholder.com/150",
                sexo: "Femenino",
                anios_experiencia: 6,
                fecha_nacimiento: "1988-07-25",
                pais: "País 5",
                departamento: "Departamento 5",
                ciudad: "Ciudad 5",
                direccion: "Carrera 1011",
                telefono: "777777777",
                licencia: "M101112",
                verificado: true,
                estado: false
            }
        ];

        for(let i = 0; i < medicosEjemplo.length; i++){
            const medico = new Medico(
                medicosEjemplo[i].id,
                medicosEjemplo[i].usuario_id,
                medicosEjemplo[i].especialidad_id,
                medicosEjemplo[i].fotografia,
                medicosEjemplo[i].sexo,
                medicosEjemplo[i].anios_experiencia,
                medicosEjemplo[i].fecha_nacimiento,
                medicosEjemplo[i].pais,
                medicosEjemplo[i].departamento,
                medicosEjemplo[i].ciudad,
                medicosEjemplo[i].direccion,
                medicosEjemplo[i].telefono,
                medicosEjemplo[i].licencia,
                medicosEjemplo[i].verificado,
                medicosEjemplo[i].estado
            );
            medicos.push(medico);
        }
    }
}

module.exports = MedicosController;
