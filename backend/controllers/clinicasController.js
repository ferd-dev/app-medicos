const Clinica = require('../models/Clinica');

class ClinicasController {
    async obtenerClinicas(req, res) {
        try {
            const clinicas = await Clinica.obtenerClinicas();

            res.status(200).json({ clinicas });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener las clinicas' });
        }
    }

}

module.exports = ClinicasController;
