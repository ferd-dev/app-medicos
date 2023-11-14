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

    async registrar() {
        try {
            const db = new Database();
            await db.connect();

            // Verificar si ya existe un usuario con el mismo correo o nombre de usuario
            const checkQuery = 'SELECT COUNT(*) AS count FROM usuarios WHERE correo = ? OR usuario = ?';
            const checkParams = [this.correo, this.usuario];
            const checkResult = await db.query(checkQuery, checkParams);
            const count = checkResult[0].count;

            if (count > 0) {
                throw new Error(
                    'Ya existe un usuario con el mismo correo o nombre de usuario.'
                );
            }

            // Generar el hash de la contraseña
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(this.password, saltRounds);

            const insertQuery = 'INSERT INTO usuarios (nombre, apellidos, usuario, correo, password, rol) VALUES (?, ?, ?, ?, ?, ?)';
            const insertParams = [
                this.nombre,
                this.apellidos,
                this.usuario,
                this.correo,
                hashedPassword,
                this.rol,
            ];

            const insertResult = await db.query(insertQuery, insertParams);
            const userId = insertResult.insertId;

            const token = jwt.sign(
                { id: userId, usuario: this.usuario, rol: this.rol  },
                process.env.JWT_SECRET, {
                    expiresIn: '1h',
                }
            );

            await db.close();
            return { id_usuario: userId, token };
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

            if (!usuarioEncontrado) {
                throw new Error('Usuario no encontrado.');
            }

            // Verificar la contraseña
            const passwordValido = await bcrypt.compare(password, usuarioEncontrado.password);

            if (!passwordValido) {
                throw new Error('Contraseña incorrecta.');
            }

            // Generar el token JWT
            const token = jwt.sign(
                { id: usuarioEncontrado.id, usuario: usuarioEncontrado.usuario, rol: usuarioEncontrado.rol  },
                process.env.JWT_SECRET, {
                    expiresIn: '1h',
                }
            );

            this.token = token;
            await db.close();

            return { usuario: usuarioEncontrado, token };
        } catch (error) {
            throw error;
        }
    }

    cerrarSesion() {
        this.token = null;
    }
}

module.exports = Usuario;
