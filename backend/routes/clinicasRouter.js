const express = require('express');
const ClinicasController = require('../controllers/clinicasController');
const router = express.Router();
const clinicasController = new ClinicasController();


router.get('/', clinicasController.obtenerClinicas);

module.exports = router;
