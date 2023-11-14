const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const Medico = require('../models/Medico');

class UsuariosController {
    async registrarUsuario(req, res) {
        try {
            const { nombre, apellidos, usuario, correo, password, rol } = req.body;

            const usuarioNuevo = new Usuario(
                null,
                nombre,
                apellidos,
                usuario,
                correo,
                password,
                rol
            );

            const { id_usuario, token } = await usuarioNuevo.registrar();

            let data = {};

            if (rol === 'medi') {
                const medicoNuevo = new Medico(
                    null,
                    id_usuario,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
                );

                const { id_medico } =  await medicoNuevo.crear();
                data = {
                    id_usuario,
                    id_medico,
                    token
                }
            } else {
                data = {
                    id_usuario,
                    token
                }
            }
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async iniciarSesion(req, res) {
        try {
            const { usuario, password } = req.body;
            const usuarioExistente = new Usuario();
            const resultado = await usuarioExistente.iniciarSesion(usuario, password);

            res.status(200).json({ usuario: resultado.usuario, token: resultado.token });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    cerrarSesion(req, res) {
        try {
            const usuario = new Usuario();
            usuario.cerrarSesion();
            res.status(200).json({ message: 'Sesión cerrada exitosamente.' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UsuariosController;
