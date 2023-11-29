const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const Database = require('../config/DataBase');

class Usuario {
    constructor(id, nombre, apellidos, usuario, correo, password, rol) {
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.usuario = usuario;
        this.correo = correo;
        this.password = password;
        this.rol = rol;
        this.token = null;
    }

    async actualizarUsuario(id_usuario) {
        try {
            const db = new Database();
            await db.connect();
            const query = 'UPDATE usuarios SET nombre = ?, apellidos = ? WHERE id = ?';
            const params = [this.nombre, this.apellidos, id_usuario];
            await db.query(query, params);
            await db.close();
        } catch (error) {
            throw new Error('Error al actualizar el usuario en la base de datos');
        }
    }

    async obtenerUsuarioPorId(id_usuario) {
        try {
            const db = new Database();
            await db.connect();
            const query = 'SELECT * FROM usuarios WHERE id = ?';
            const params = [id_usuario];
            const resultado = await db.query(query, params);

            if (resultado.length === 0) throw new Error('No se encontró el medico');
            await db.close();

            const { nombre, apellidos, usuario, correo, rol } = resultado[0];
            return { nombre, apellidos, usuario, correo, rol };
        } catch (error) {
            throw new Error('Error al obtener el usuario de la base de datos');
        }
    }

    async registrar() {
        try {
            const db = new Database();
            await db.connect();

            const checkQuery = 'SELECT COUNT(*) AS count FROM usuarios WHERE correo = ? OR usuario = ?';
            const checkParams = [this.correo, this.usuario];
            const checkResult = await db.query(checkQuery, checkParams);
            const count = checkResult[0].count;

            if (count > 0) throw new Error('Ya existe un usuario con el mismo correo o nombre de usuario.');

            // Generar el hash de la contraseña
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(this.password, saltRounds);

            const insertQuery = 'INSERT INTO usuarios (nombre, apellidos, usuario, correo, password, rol) VALUES (?, ?, ?, ?, ?, ?)';
            const insertParams = [this.nombre, this.apellidos, this.usuario, this.correo, hashedPassword, this.rol];
            const insertResult = await db.query(insertQuery, insertParams);

            const id_usuario = insertResult.insertId;

            const token = jwt.sign(
                { id: id_usuario, usuario: this.usuario, rol: this.rol  },
                process.env.JWT_SECRET, {
                    expiresIn: '1h',
                }
            );
            await db.close();

            return {
                id_usuario,
                token
            };
        } catch (error) {
            throw error;
        }
    }

    async iniciarSesion(usuario, password) {
        try {
            const db = new Database();
            await db.connect();

            const query = 'SELECT * FROM usuarios WHERE usuario = ? OR correo = ?';
            const params = [usuario, usuario];
            const result = await db.query(query, params);
            const usuarioEncontrado = result[0];

            if (!usuarioEncontrado) throw new Error('Usuario no encontrado.');

            const passwordValido = await bcrypt.compare(password, usuarioEncontrado.password);

            if (!passwordValido) throw new Error('Contraseña incorrecta.');

            const token = jwt.sign(
                { id: usuarioEncontrado.id, usuario: usuarioEncontrado.usuario, rol: usuarioEncontrado.rol  },
                process.env.JWT_SECRET, {
                    expiresIn: '1h',
                }
            );

            this.token = token;
            await db.close();

            return {
                dataUsuario: usuarioEncontrado,
                token: token
            };
        } catch (error) {
            throw error;
        }
    }

    cerrarSesion() {
        this.token = null;
    }

    async obtenerUsuarios() {
        try {
            const db = new Database();
            await db.connect();
            const query = 'SELECT * FROM usuarios WHERE rol = "user" ORDER BY id DESC';
            const result = await db.query(query);
            await db.close();
            return result;
        } catch (error) {
            throw new Error('Error al obtener los usuarios de la base de datos');
        }
    }

    async obtenerUsuariosMedicos() {
        try {
            const db = new Database();
            await db.connect();
            const query = 'SELECT * FROM usuarios WHERE rol = "medi" ORDER BY id DESC';
            const result = await db.query(query);
            await db.close();
            return result;
        } catch (error) {
            throw new Error('Error al obtener los usuarios de la base de datos');
        }
    }

    async obtenerUsuariosAdministradores() {
        try {
            const db = new Database();
            await db.connect();
            const query = 'SELECT * FROM usuarios WHERE rol = "admin" ORDER BY id DESC';
            const result = await db.query(query);
            await db.close();
            return result;
        } catch (error) {
            throw new Error('Error al obtener los usuarios de la base de datos');
        }
    }

    async registrarUsuarioAdmin() {
        try {
            const db = new Database();
            await db.connect();

            const checkQuery = 'SELECT COUNT(*) AS count FROM usuarios WHERE correo = ? OR usuario = ?';
            const checkParams = [this.correo, this.usuario];
            const checkResult = await db.query(checkQuery, checkParams);
            const count = checkResult[0].count;

            if (count > 0) throw new Error('Ya existe un usuario con el mismo correo o nombre de usuario.');

            // Generar el hash de la contraseña
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(this.password, saltRounds);

            const insertQuery = 'INSERT INTO usuarios (nombre, apellidos, usuario, correo, password, rol) VALUES (?, ?, ?, ?, ?, ?)';
            const insertParams = [this.nombre, this.apellidos, this.usuario, this.correo, hashedPassword, this.rol];
            const insertResult = await db.query(insertQuery, insertParams);

            const id_usuario = insertResult.insertId;

            await db.close();

            return {
                id_usuario
            };
        } catch (error) {
            throw error;
        }
    }

    async obtenerUsuarioId(id_usuario) {
        try {
            const db = new Database();
            await db.connect();
            const query = 'SELECT * FROM usuarios WHERE id = ?';
            const params = [id_usuario];
            const resultado = await db.query(query, params);

            if (resultado.length === 0) throw new Error('No se encontró el medico');
            await db.close();

            const { id, nombre, apellidos, usuario, correo, rol } = resultado[0];
            return { id, nombre, apellidos, usuario, correo, rol };
        } catch (error) {
            throw new Error('Error al obtener el usuario de la base de datos');
        }
    }

    async actualizarUsuarioId(id_usuario) {
        try {
            const db = new Database();
            await db.connect();
            const query = 'UPDATE usuarios SET nombre = ?, apellidos = ? WHERE id = ?';
            const params = [this.nombre, this.apellidos, id_usuario];
            await db.query(query, params);
            await db.close();
        } catch (error) {
            throw new Error('Error al actualizar el usuario en la base de datos');
        }
    }

    async cambiarEstadoUsuarioAdmin(id, activo) {
        try {
            const db = new Database();
            await db.connect();
            const query = 'UPDATE usuarios SET activo = ? WHERE id = ?';
            const params = [activo, id];
            const resultado = await db.query(query, params);

            await db.close();
            return resultado.insertId;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = Usuario;
