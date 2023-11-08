const express = require('express');
const EspecialidadesController = require('../controllers/especialidadesController');
const router = express.Router();
const especialidadesController = new EspecialidadesController();

router.get('/', especialidadesController.getEspecialidades);
router.get('/:id', especialidadesController.getEspecialidad);
router.post('/', especialidadesController.crearEspecialidad);
router.put('/:id', especialidadesController.actualizarEspecialidad);
router.delete('/:id', especialidadesController.eliminarEspecialidad);

module.exports = router;
