const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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

            // Insertar el nuevo usuario en la base de datos
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

            // Generar el token JWT
            const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });

            // Cerrar la conexión a la base de datos
            await db.close();

            // Devolver el id y el token
            return { id: userId, token };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Usuario;
