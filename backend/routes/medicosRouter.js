const express = require('express');
const MedicosController = require('../controllers/medicosController');
const router = express.Router();
const medicosController = new MedicosController();

router.get('/', medicosController.getMedicos);
router.get('/:id', medicosController.getmedico);
router.post('/', medicosController.crearMedico);
router.put('/:id', medicosController.actualizarMedico);
router.delete('/:id', medicosController.eliminarMedico);

module.exports = router;
