const Trabajo = require('../models/Trabajo');

class TrabajosController {
    async obtenerTrabajosMedico(req, res) {
        try {
            const { id_medico } = req.query;
            const trabajos = await Trabajo.obtenerTrabajosDeMedico(id_medico);

            const data = {
                "success": true,
                "data": trabajos,
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

module.exports = TrabajosController;
