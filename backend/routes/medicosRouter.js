const express = require('express');
const MedicosController = require('../controllers/medicosController');
const router = express.Router();
const medicosController = new MedicosController();


router.get('/:id', medicosController.obtenerMedico);
router.get('/', medicosController.getMedicos);
router.get('/getCompleto/:id', medicosController.obtenerDatosMedicoCompleto);
router.put('/editar/:id', medicosController.actualizarMedico);

module.exports = router;
