const Database = require('../config/DataBase');

class Especialidad {
    constructor(id, nombre, descripcion, activo) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.activo = activo;
    }

    static async obtenerEspecialidades() {
        try {
            const db = new Database();
            await db.connect();
            const query = 'SELECT * FROM especialidades ORDER BY nombre ASC';
            const resultado = await db.query(query);
            await db.close();

            const especialidades = resultado.map(especialidad => {
                const { id, nombre, descripcion, activo } = especialidad;
                return new Especialidad(id, nombre, descripcion, activo);
            });

            return especialidades;
        } catch (error) {
            throw new Error('Error al obtener las especialidades de la base de datos');
        }
    }

    static async obtenerEspecialidadPorId(id) {
        try {
            const db = new Database();
            await db.connect();
            const query = 'SELECT * FROM especialidades WHERE id = ?';
            const params = [id];
            const resultado = await db.query(query, params);

            if (resultado.length === 0) {
                throw new Error('No se encontró la especialidad');
            }
            await db.close();

            const { nombre, descripcion, activo } = resultado[0];
            const especialidad = new Especialidad(id, nombre, descripcion, activo);
            return especialidad;
        } catch (error) {
            throw new Error('Error al obtener la especialidad de la base de datos');
        }
    }

    async crearEspecialidad() {
        try {
            const db = new Database();
            await db.connect();
            const query = 'INSERT INTO especialidades (nombre, descripcion) VALUES (?, ?)';
            const params = [this.nombre, this.descripcion];
            const resultado = await db.query(query, params);

            await db.close();
            return resultado.insertId;
        } catch (error) {
            throw new Error('Error al crear la especialidad en la base de datos');
        }
    }

    async actualizarEspecialidad() {
        try {
            const db = new Database();
            await db.connect();
            const query = 'UPDATE especialidades SET nombre = ?, descripcion = ? WHERE id = ?';
            const params = [this.nombre, this.descripcion, this.id];
            await db.query(query, params);
            await db.close();

            return true;
        } catch (error) {
            throw new Error('Error al actualizar la especialidad en la base de datos');
        }
    }

    static async activarEspecialidad(id) {
        try {
            const db = new Database();
            await db.connect();
            const query = 'UPDATE especialidades SET activo = 1 WHERE id = ?';
            const params = [id];
            await db.query(query, params);
            await db.close();

            return true;
        } catch (error) {
            throw new Error('Error al activar la especialidad en la base de datos');
        }
    }

    static async desactivarEspecialidad(id) {
        try {
            const db = new Database();
            await db.connect();
            const query = 'UPDATE especialidades SET activo = 0 WHERE id = ?';
            const params = [id];
            await db.query(query, params);
            await db.close();

            return true;
        } catch (error) {
            throw new Error('Error al desactivar la especialidad en la base de datos');
        }
    }
}

module.exports = Especialidad;
