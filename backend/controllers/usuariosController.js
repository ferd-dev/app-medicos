const Usuario = require('../models/Usuario');
const Medico = require('../models/Medico');

class UsuariosController {
    async actualizarUsuario(req, res) {
        try {
            const { nombre, apellidos } = req.body;
            const usuario = new Usuario();
            const {id_usuario} = req.params;
            usuario.nombre = nombre;
            usuario.apellidos = apellidos;
            await usuario.actualizarUsuario(id_usuario);
            const data = {
                "success": true,
                message: 'Usuario actualizado exitosamente.',
                "data": {
                    "nombre": nombre,
                    "apellidos": apellidos
                }
            }

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({
                "success": false,
                "message": error.message
            });
        }
    }


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
            const datosUsuario = await usuarioNuevo.obtenerUsuarioPorId(id_usuario)

            if (rol === 'medi') {
                const medicoNuevo = new Medico(null, id_usuario, null, null, null, null, null, null, null, null, null, null);
                const { id_medico } =  await medicoNuevo.crear();
                let data = {
                    "success": true,
                    "message": "Medico registrado exitosamente",
                    "data": {
                        "id_usuario": id_usuario,
                        "id_medico": id_medico,
                        "datosUsuario": datosUsuario
                    },
                    "token": token
                }
                res.status(200).json(data);
            } else {
                let data = {
                    "success": true,
                    "message": "Usuario registrado exitosamente",
                    "data": {
                        "id_usuario": id_usuario,
                        "datosUsuario": datosUsuario
                    },
                    "token": token
                }
                res.status(200).json(data);
            }
        } catch (error) {
            res.status(500).json({
                "success": false,
                "message": error.message
            });
        }
    }

    async iniciarSesion(req, res) {
        try {
            const { usuario, password } = req.body;
            const usuarioExistente = new Usuario();
            const { dataUsuario, token} = await usuarioExistente.iniciarSesion(usuario, password);
            const datosUsuario = await usuarioExistente.obtenerUsuarioPorId(dataUsuario.id)

            if (dataUsuario.rol === 'medi') {
                const medicoExistente = new Medico();
                const { id_medico } = await medicoExistente.obtenerMedicoPorIdUsuario(dataUsuario.id);
                res.status(200).json({
                    "success": true,
                    "message": "Medico registrado exitosamente",
                    "data": {
                        id_usuario: dataUsuario.id,
                        id_medico: id_medico,
                        datosUsuario:datosUsuario
                    },
                    "token": token
                });
            } else {
                res.status(200).json({
                    "success": true,
                    "message": "Medico registrado exitosamente",
                    "data": {
                        id_usuario: dataUsuario.id,
                        datosUsuario: datosUsuario
                    },
                    "token": token
                });
            }
        } catch (error) {
            res.status(500).json({
                "success": false,
                "message": error.message
            });
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

    async obtenerUsuarios(req, res) {
        try {
            const usuario = new Usuario();
            const usuarios = await usuario.obtenerUsuarios();
            const data = {
                "success": true,
                "data": usuarios,
            }
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async registrarUsuarioAdmin(req, res) {
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

            const { id_usuario } = await usuarioNuevo.registrarUsuarioAdmin();
            await usuarioNuevo.obtenerUsuarioPorId(id_usuario)

            if (rol === 'medi') {
                const medicoNuevo = new Medico(null, id_usuario, null, null, null, null, null, null, null, null, null, null);
                const { id_medico } =  await medicoNuevo.crear();
                let data = {
                    "success": true,
                    "message": "Medico registrado exitosamente",
                }
                res.status(200).json(data);
            } else {
                let data = {
                    "success": true,
                    "message": "Usuario registrado exitosamente",
                }
                res.status(200).json(data);
            }
        } catch (error) {
            res.status(500).json({
                "success": false,
                "message": error.message
            });
        }
    }

    async obtenerUsuarioId(req, res) {
        try {
            const { id } = req.params;
            const usuario = new Usuario();
            const usuarioEncontrado = await usuario.obtenerUsuarioId(id);
            const data = {
                "success": true,
                "data": usuarioEncontrado,
            }
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({
                "success": false,
                "message": error.message
            });
        }
    }

    async actualizarUsuarioParaAdmin(req, res) {
        try {
            const { nombre, apellidos } = req.body;
            const usuario = new Usuario();
            const { id } = req.params;
            usuario.nombre = nombre;
            usuario.apellidos = apellidos;
            await usuario.actualizarUsuarioId(id);
            const data = {
                "success": true,
                "message": 'Usuario actualizado exitosamente.'
            }

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({
                "success": false,
                "message": error.message
            });
        }
    }

    async cambiarEstadoUsuarioAdmin(req, res) {
        try {
            const { id } = req.params;
            const { activo } = req.body;
            const usuario = new Usuario();
            await usuario.cambiarEstadoUsuarioAdmin(id, activo);

            const data = {
                "success": true,
                "message": "Estado del usuario actualizado correctamente"
            }

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({
                "success": false,
                "message": error.message
            });
        }
    }

    async obtenerUsuariosMedicos(req, res) {
        try {
            const usuario = new Usuario();
            const usuarios = await usuario.obtenerUsuariosMedicos();
            const data = {
                "success": true,
                "data": usuarios,
            }
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async obtenerUsuariosAdministradores(req, res) {
        try {
            const usuario = new Usuario();
            const usuarios = await usuario.obtenerUsuariosAdministradores();
            const data = {
                "success": true,
                "data": usuarios,
            }
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UsuariosController;
