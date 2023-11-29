const express = require('express');
const UsuariosController = require('../controllers/usuariosController');
const router = express.Router();
const usuariosController = new UsuariosController();

router.post('/registrar', usuariosController.registrarUsuario);
router.post('/iniciar-sesion', usuariosController.iniciarSesion);
router.post('/cerrar-sesion', usuariosController.cerrarSesion);
router.post('/admin/registrar', usuariosController.registrarUsuarioAdmin);
router.post('/admin/estado/:id', usuariosController.cambiarEstadoUsuarioAdmin);
router.get('/admin/usuarios', usuariosController.obtenerUsuarios);
router.get('/admin/usuarios/medicos', usuariosController.obtenerUsuariosMedicos);
router.get('/admin/usuarios/administradores', usuariosController.obtenerUsuariosAdministradores);
router.get('/admin/usuarios/:id', usuariosController.obtenerUsuarioId);
router.put('/editar/:id_usuario', usuariosController.actualizarUsuario);
router.put('/admin/usuarios/:id', usuariosController.actualizarUsuarioParaAdmin);

module.exports = router;
