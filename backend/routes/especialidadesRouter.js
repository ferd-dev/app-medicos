const express = require('express');
const EspecialidadesController = require('../controllers/especialidadesController');
const { autenticacionMiddleware, autorizacionMiddleware } = require('../middlewares/seguridad');
const router = express.Router();
const especialidadesController = new EspecialidadesController();


router.get('/', autenticacionMiddleware, especialidadesController.obtenerEspecialidades);
router.get('/:id', especialidadesController.obtenerEspecialidad);
router.post('/', especialidadesController.crearEspecialidad);
router.put('/:id', especialidadesController.actualizarEspecialidad);
router.patch('/activar/:id', especialidadesController.activarEspecialidad);
router.patch('/desactivar/:id', especialidadesController.desactivarEspecialidad);

module.exports = router;
