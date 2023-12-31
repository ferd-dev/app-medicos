const Especialidad = require('../models/Especialidad');

class EspecialidadesController {
    async obtenerEspecialidades(req, res) {
        try {
            const especialidades = await Especialidad.obtenerEspecialidades();

            const data = {
                "success": true,
                "data": especialidades,
            }

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({
                "success": false,
                "message": error.message
            });
        }
    }

    async obtenerEspecialidad(req, res) {
        try {
            const { id } = req.params;
            const especialidad = await Especialidad.obtenerEspecialidadPorId(id);

            res.status(200).json({ especialidad });
        } catch (error) {
            res.status(404).json({ error: 'Especialidad no encontrada' });
        }
    }

    async crearEspecialidad(req, res) {
        try {
            const { nombre, descripcion } = req.body;
            const especialidad = new Especialidad(
                null,
                nombre,
                descripcion,
                1
            );
            const especialidadId = await especialidad.crearEspecialidad();

            res.status(201).json({
                id: especialidadId,
                state: true,
                message: 'Especialidad creada exitosamente',
            });
        } catch (error) {
            res.status(500).json({ error: 'Error al crear la especialidad' });
        }
    }

    async actualizarEspecialidad(req, res) {
        try {
            const { id } = req.params;
            const { nombre, descripcion } = req.body;
            const especialidad = new Especialidad(
                id,
                nombre,
                descripcion,
                1
            );
            await especialidad.actualizarEspecialidad();

            res.status(200).json({ state: true, message: 'Especialidad actualizada' });
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar la especialidad' });
        }
    }

    async activarEspecialidad(req, res) {
        try {
            const { id } = req.params;
            await Especialidad.activarEspecialidad(id);

            res.status(200).json({ state: true, message: 'Especialidad activada' });
        } catch (error) {
            res.status(500).json({ error: 'Error al activar la especialidad' });
        }
    }

    async desactivarEspecialidad(req, res) {
        try {
            const { id } = req.params;
            await Especialidad.desactivarEspecialidad(id);

            res.status(200).json({ state: true, message: 'Especialidad desactivada' });
        } catch (error) {
            res.status(500).json({ error: 'Error al desactivar la especialidad' });
        }
    }

}

module.exports = EspecialidadesController;
