const express = require('express');
const UsuariosController = require('../controllers/usuariosController');
const router = express.Router();
const usuariosController = new UsuariosController();

router.post('/registrar', usuariosController.registrarUsuario);

module.exports = router;
