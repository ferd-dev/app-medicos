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
}

module.exports = UsuariosController;
