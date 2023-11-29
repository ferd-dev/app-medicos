const express = require('express');
const TrabajosController = require('../controllers/trabajosController');
const router = express.Router();
const trabajosController = new TrabajosController();


router.get('/medico', trabajosController.obtenerTrabajosMedico);

module.exports = router;
