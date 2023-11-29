const Database = require('../config/DataBase');

class Clinica {
    constructor(id, nombre, telefono, departamento, municipio, direccion, activo) {
        this.id = id;
        this.nombre = nombre;
        this.telefono = telefono;
        this.departamento = departamento;
        this.municipio = municipio;
        this.direccion = direccion;
        this.activo = activo;
    }

    static async obtenerClinicas(cantidad) {
        try {
            const db = new Database();
            await db.connect();
            let query = 'SELECT * FROM clinicas WHERE activo = 1 ORDER BY id DESC';

            if (cantidad) {
                query += ` LIMIT ${cantidad}`;
            }
            const resultado = await db.query(query);
            await db.close();

            const clinicas = resultado.map(clinica => {
                const { id, nombre, telefono, departamento, municipio, direccion, activo } = clinica;
                return new Clinica(id, nombre, telefono, departamento, municipio, direccion, activo);
            });

            return clinicas;
        } catch (error) {
            throw new Error('Error al obtener las clinicas de la base de datos');
        }
    }

    static async obtenerClinicaPorId(id) {
        try {
            const db = new Database();
            await db.connect();

            const query = 'SELECT * FROM clinicas WHERE id = ?';
            const parametros = [id];

            const resultado = await db.query(query, parametros);
            await db.close();

            const clinica = resultado.map(clinica => {
                const { id, nombre, telefono, departamento, municipio, direccion } = clinica;
                return new Clinica(id, nombre, telefono, departamento, municipio, direccion);
            });

            return clinica[0];
        } catch (error) {
            throw new Error('Error al obtener la clinica de la base de datos');
        }
    }

    static async obrenerClinicasAdmin() {
        try {
            const db = new Database();
            await db.connect();
            let query = 'SELECT * FROM clinicas ORDER BY id DESC';

            const resultado = await db.query(query);
            await db.close();

            const clinicas = resultado.map(clinica => {
                const { id, nombre, telefono, departamento, municipio, direccion, activo } = clinica;
                return new Clinica(id, nombre, telefono, departamento, municipio, direccion, activo);
            });

            return clinicas;
        } catch (error) {
            throw new Error('Error al obtener las clinicas de la base de datos');
        }
    }

    async crearClinicaAdmin() {
        try {
            const db = new Database();
            await db.connect();
            const query = 'INSERT INTO clinicas (nombre, telefono, departamento, municipio, direccion) VALUES (?, ?, ?, ?, ?)';
            const params = [this.nombre, this.telefono, this.departamento, this.municipio, this.direccion];
            const resultado = await db.query(query, params);

            await db.close();
            return resultado.insertId;
        } catch (error) {
            throw new Error(error);
        }
    }

    static async obtenerClinicaAdmin(id) {
        try {
            const db = new Database();
            await db.connect();

            const query = 'SELECT * FROM clinicas WHERE id = ?';
            const parametros = [id];

            const resultado = await db.query(query, parametros);
            await db.close();

            const clinica = resultado.map(clinica => {
                const { id, nombre, telefono, departamento, municipio, direccion } = clinica;
                return new Clinica(id, nombre, telefono, departamento, municipio, direccion);
            });

            return clinica[0];
        } catch (error) {
            throw new Error(error);
        }
    }

    async actualizarClinicaAdmin() {
        try {
            const db = new Database();
            await db.connect();
            const query = 'UPDATE clinicas SET nombre = ?, telefono = ?, departamento = ?, municipio = ?, direccion = ? WHERE id = ?';
            const params = [this.nombre, this.telefono, this.departamento, this.municipio, this.direccion, this.id];
            const resultado = await db.query(query, params);

            await db.close();
            return resultado.insertId;
        } catch (error) {
            throw new Error(error);
        }
    }

    async cambiarEstadoClinicaAdmin() {
        try {
            const db = new Database();
            await db.connect();
            const query = 'UPDATE clinicas SET activo = ? WHERE id = ?';
            const params = [this.activo, this.id];
            const resultado = await db.query(query, params);

            await db.close();
            return resultado.insertId;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = Clinica;
