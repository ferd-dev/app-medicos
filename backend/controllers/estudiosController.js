const Estudio = require('../models/Estudio');

class EstudiosController {
    async obtenerEstudiosMedico(req, res) {
        try {
            const { id_medico } = req.query;
            const estudios = await Estudio.obtenerEstudiosDeMedico(id_medico);

            const data = {
                "success": true,
                "data": estudios,
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

module.exports = EstudiosController;
