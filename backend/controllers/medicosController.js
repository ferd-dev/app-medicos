const Medico = require('../models/Medico');
const Especialidad = require('../models/Especialidad');
const Clinica = require('../models/Clinica');
const Trabajo = require('../models/Trabajo');
const Estudio = require('../models/Estudio');

class MedicosController{
    async obtenerMedico(req, res) {
        try {
            const { id } = req.params;
            const medico = new Medico();
            const { dataMedico } = await medico.obtenerMedicoPorId(id);
            if (dataMedico.id_especialidad) {
                const especialidad = await Especialidad.obtenerEspecialidadPorId(dataMedico.id_especialidad);
                dataMedico.especialidad = especialidad.nombre;
            } else {
                dataMedico.especialidad = 'Sin especialidad';
            }

            let data = {
                "success": true,
                "data": dataMedico
            }

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({
                "success": false,
                "message": error.message
            });
        }
    }

    async actualizarMedico(req, res) {
        try {
            const { id } = req.params;
            const { id_especialidad, id_clinica, anios_experiencia, fecha_nacimiento, pais, departamento, ciudad, licencia } = req.body;
            const medico = new Medico(id, null, parseInt(id_especialidad), parseInt(id_clinica), anios_experiencia, fecha_nacimiento, pais, departamento, ciudad, null,  licencia, null);
            await medico.actualizar();

            let data = {
                "success": true,
                "msg": "Medico actualizado"
            }

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({
                "success": false,
                "message": error.message
            });
        }
    }

    async getMedicos(req, res) {
        try {
            const { cantidad, orden, id_especialidad, id_clinica, anios_experiencia, departamento } = req.query;
            const medico = new Medico();

            const filtros = {};
            if (id_especialidad) { filtros.id_especialidad = id_especialidad; }
            if (id_clinica) { filtros.id_clinica = id_clinica; }
            if (anios_experiencia) { filtros.anios_experiencia = anios_experiencia; }
            if (departamento) { filtros.departamento = departamento; }

            const { resultado } = await medico.getMedicos(cantidad, orden, filtros);

            for (let i = 0; i < resultado.length; i++) {
                const dataMedico = resultado[i];
                if (dataMedico.id_especialidad) {
                    const especialidad = await Especialidad.obtenerEspecialidadPorId(dataMedico.id_especialidad);
                    dataMedico.especialidad = especialidad.nombre;
                } else {
                    dataMedico.especialidad = 'Sin especialidad';
                }

                if (dataMedico.id_clinica) {
                    const clinica = await Clinica.obtenerClinicaPorId(dataMedico.id_clinica);
                    dataMedico.clinica = clinica.nombre;
                } else {
                    dataMedico.clinica = 'Sin clinica';
                }
            }



            let data = {
                "success": true,
                "data": resultado
            }

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({
                "success": false,
                "message": error.message
            });
        }
    }

    async obtenerDatosMedicoCompleto(req, res) {
        try {
            const { id } = req.params;
            const medico = new Medico();
            const { dataMedico } = await medico.obtenerMedicoPorId(id);
            if (dataMedico.id_especialidad) {
                const especialidad = await Especialidad.obtenerEspecialidadPorId(dataMedico.id_especialidad);
                dataMedico.especialidad = especialidad.nombre;
            } else {
                dataMedico.especialidad = 'Sin especialidad';
            }

            if (dataMedico.id_clinica) {
                const clinica = await Clinica.obtenerClinicaPorId(dataMedico.id_clinica);
                dataMedico.clinica = clinica.nombre;
            } else {
                dataMedico.clinica = 'Sin clinica';
            }

            const trabajos = await Trabajo.obtenerTrabajosDeMedico(id);
            const estudios = await Estudio.obtenerEstudiosDeMedico(id);

            let data = {
                "success": true,
                "data": dataMedico,
                "trabajos": trabajos,
                "estudios": estudios
            }

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({
                "success": false,
                "message": error.message
            });
        }
    }
}

module.exports = MedicosController;
