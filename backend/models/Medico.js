const Database = require('../config/DataBase');

class Medico{
    constructor(id, id_usuario, id_especialidad, id_clinica, anios_experiencia, fecha_nacimiento, pais, departamento, ciudad, fotografia, licencia, verificado){
        this.id = id;
        this.id_usuario = id_usuario;
        this.id_especialidad = id_especialidad;
        this.id_clinica = id_clinica;
        this.anios_experiencia = anios_experiencia;
        this.fecha_nacimiento = fecha_nacimiento;
        this.pais = pais;
        this.departamento = departamento;
        this.ciudad = ciudad;
        this.fotografia = fotografia;
        this.licencia = licencia;
        this.verificado = verificado;
    }

    async obtenerMedicoPorId(id_medico) {
        try {
            const db = new Database();
            await db.connect();
            // const query = 'SELECT * FROM medicos WHERE id = ?';
            const query = `SELECT medicos.*, usuarios.nombre, usuarios.apellidos, usuarios.correo
                    FROM medicos
                    INNER JOIN usuarios ON medicos.id_usuario =  usuarios.id
                    WHERE medicos.id = ?`;
            const params = [id_medico];
            const resultado = await db.query(query, params);

            if (resultado.length === 0) throw new Error('No se encontró el medico');
            await db.close();

            const dataMedico = resultado[0];

            return { dataMedico: dataMedico };
        } catch (error) {
            throw new Error('Error al obtener el medico de la base de datos');
        }
    }

    async obtenerMedicoPorIdUsuario(id_usuario) {
        try {
            const db = new Database();
            await db.connect();
            const query = 'SELECT * FROM medicos WHERE id_usuario = ?';
            const params = [id_usuario];
            const resultado = await db.query(query, params);

            if (resultado.length === 0) throw new Error('No se encontró el medico');
            await db.close();

            const { id } = resultado[0];

            return { id_medico: id };
        } catch (error) {
            throw new Error('Error al obtener el medico de la base de datos');
        }
    }

    async crear() {
        try {
            const db = new Database();
            await db.connect();

            const query = 'INSERT INTO medicos (id_usuario, id_especialidad, id_clinica, anios_experiencia, fecha_nacimiento, pais, departamento, ciudad, fotografia, licencia, verificado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            const parametros = [
                this.id_usuario,
                this.id_especialidad,
                this.id_clinica,
                this.anios_experiencia,
                this.fecha_nacimiento,
                this.pais,
                this.departamento,
                this.ciudad,
                this.fotografia,
                this.licencia,
                this.verificado
            ];

            const result = await db.query(query, parametros);
            const id_medico = result.insertId;
            await db.close();
            return { id_medico: id_medico };
        } catch (error) {
            throw error;
        }
    }

    async actualizar() {
        try {
            const db = new Database();
            await db.connect();

            const query = 'UPDATE medicos SET id_especialidad = ?, id_clinica = ?, anios_experiencia = ?, fecha_nacimiento = ?, pais = ?, departamento = ?, ciudad = ?, licencia = ? WHERE id = ?';
            const parametros = [
                this.id_especialidad,
                this.id_clinica,
                this.anios_experiencia,
                this.fecha_nacimiento,
                this.pais,
                this.departamento,
                this.ciudad,
                this.licencia,
                this.id
            ];

            await db.query(query, parametros);
            await db.close();
            return { id_medico: this.id };
        } catch (error) {
            throw error;
        }
    }

    async getMedicos(cantidad, orden = 'DESC', filtros = {}) {
        try {
            const db = new Database();
            await db.connect();

            let query = `SELECT usuarios.*,medicos.id as 'id_medico', medicos.id_especialidad, id_clinica, anios_experiencia, fecha_nacimiento, pais, departamento, ciudad, fotografia, licencia, verificado
                            FROM usuarios
                            INNER JOIN medicos ON usuarios.id = medicos.id_usuario
                            WHERE usuarios.activo = 1`;

            if (filtros.id_especialidad) {
                query += ` AND medicos.id_especialidad = ${filtros.id_especialidad}`;
            }

            if (filtros.id_clinica) {
                query += ` AND medicos.id_clinica = ${filtros.id_clinica}`;
            }

            if (filtros.anios_experiencia) {
                query += ` AND medicos.anios_experiencia >= ${filtros.anios_experiencia}`;
            }

            if (filtros.departamento) {
                query += ` AND medicos.departamento = '${filtros.departamento}'`;
            }

            //
            if (orden) {
                query += ` ORDER BY usuarios.id ${orden}`;
            }
            if (cantidad) {
                query += ` LIMIT ${cantidad}`;
            }

            const resultado = await db.query(query);
            await db.close();

            return { resultado: resultado };

            // return resultado;
        } catch (error) {
            throw new Error('Error al obtener los medicos de la base de datos');
        }
    }
}

module.exports = Medico;
