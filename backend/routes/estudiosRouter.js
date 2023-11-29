const express = require('express');
const EstudiosController = require('../controllers/estudiosController');
const router = express.Router();
const estudiosController = new EstudiosController();


router.get('/medico', estudiosController.obtenerEstudiosMedico);

module.exports = router;
