const express = require('express');
const ClinicasController = require('../controllers/clinicasController');
const router = express.Router();
const clinicasController = new ClinicasController();


router.get('/', clinicasController.obtenerClinicas);
router.get('/admin', clinicasController.obtenerClinicasAdmin);
router.post('/admin', clinicasController.crearClinicaAdmin);
router.post('/admin/estado/:id', clinicasController.cambiarEstadoClinicaAdmin);
router.get('/c/:id', clinicasController.obtenerClinicaAdmin);
router.put('/admin/:id', clinicasController.actualizarClinicaAdmin);

module.exports = router;
