const express = require('express');
const UsuariosController = require('../controllers/usuariosController');
const router = express.Router();
const usuariosController = new UsuariosController();

router.post('/registrar', usuariosController.registrarUsuario);
router.post('/iniciar-sesion', usuariosController.iniciarSesion);
router.post('/cerrar-sesion', usuariosController.cerrarSesion);

module.exports = router;
