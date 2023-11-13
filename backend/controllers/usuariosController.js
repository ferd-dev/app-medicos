const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

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

            // Registrar el nuevo usuario
            const resultado = await usuarioNuevo.registrar();

            // Generar el token JWT con la clave secreta de las variables de entorno
            const token = jwt.sign({ id: resultado.id }, process.env.JWT_SECRET);

            // Devolver una respuesta exitosa con el id y el token
            res.status(200).json({ id: resultado.id, token: resultado.token });
        } catch (error) {
            // Devolver una respuesta de error con el mensaje correspondiente
            res.status(500).json({ error: error.message });
        }
    }

    async iniciarSesion(req, res) {
        try {
            const { usuario, password } = req.body;

            const usuarioExistente = new Usuario();

            // Iniciar sesión del usuario
            const resultado = await usuarioExistente.iniciarSesion(usuario, password);

            // Generar el token JWT con el id del usuario
            const token = jwt.sign({ id: resultado.usuario.id }, process.env.JWT_SECRET);

            // Devolver una respuesta exitosa con el id y el token
            res.status(200).json({ usuario: resultado.usuario, token });
        } catch (error) {
            // Devolver una respuesta de error con el mensaje correspondiente
            res.status(500).json({ error: error.message });
        }
    }

    cerrarSesion(req, res) {
        try {
            const usuario = new Usuario();

            // Cerrar sesión del usuario
            usuario.cerrarSesion();

            // Devolver una respuesta exitosa
            res.status(200).json({ message: 'Sesión cerrada exitosamente.' });
        } catch (error) {
            // Devolver una respuesta de error con el mensaje correspondiente
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UsuariosController;
