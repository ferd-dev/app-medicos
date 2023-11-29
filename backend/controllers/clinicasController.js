const Clinica = require('../models/Clinica');

class ClinicasController {
    async obtenerClinicas(req, res) {
        try {
            const { cantidad } = req.query;
            const clinicas = await Clinica.obtenerClinicas(cantidad);

            const data = {
                "success": true,
                "data": clinicas,
            }

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({
                "success": false,
                "message": error.message
            });
        }
    }

    async obtenerClinicasAdmin(req, res) {
        try {
            const clinicas = await Clinica.obrenerClinicasAdmin();

            const data = {
                "success": true,
                "data": clinicas,
            }

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({
                "success": false,
                "message": error.message
            });
        }
    }

    async crearClinicaAdmin(req, res) {
        try {
            const { nombre, telefono, departamento, municipio, direccion } = req.body;
            const clinica = new Clinica(null, nombre, telefono, departamento, municipio, direccion, 1);
            await clinica.crearClinicaAdmin();

            const data = {
                "success": true,
                "message": "Clinica creada correctamente"
            }

            res.status(201).json(data);
        } catch (error) {
            res.status(500).json({
                "success": false,
                "message": error.message
            });
        }
    }

    async obtenerClinicaAdmin(req, res) {
        try {
            const { id } = req.params;
            const clinica = await Clinica.obtenerClinicaAdmin(id);

            const data = {
                "success": true,
                "data": clinica,
            }

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({
                "success": false,
                "message": error.message
            });
        }
    }

    async actualizarClinicaAdmin(req, res) {
        try {
            const { id } = req.params;
            const { nombre, telefono, departamento, municipio, direccion } = req.body;
            const clinica = new Clinica(id, nombre, telefono, departamento, municipio, direccion);
            await clinica.actualizarClinicaAdmin();

            const data = {
                "success": true,
                "message": "Clinica actualizada correctamente"
            }

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({
                "success": false,
                "message": error.message
            });
        }
    }

    async cambiarEstadoClinicaAdmin(req, res) {
        try {
            const { id } = req.params;
            const { activo } = req.body;
            const clinica = new Clinica(id, null, null, null, null, null, activo);
            await clinica.cambiarEstadoClinicaAdmin();

            const data = {
                "success": true,
                "message": "Estado de la clinica actualizado correctamente"
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

module.exports = ClinicasController;
