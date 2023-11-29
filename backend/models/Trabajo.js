const Database = require('../config/DataBase');

class Trabajo {
    constructor(id, id_medico, id_clinica, puesto, anio_inicio, anio_fin, timepo_meses, activo) {
        this.id = id;
        this.id_medico = id_medico;
        this.id_clinica = id_clinica;
        this.puesto = puesto;
        this.anio_inicio = anio_inicio;
        this.anio_fin = anio_fin;
        this.timepo_meses = timepo_meses;
        this.activo = activo;
    }

    static async obtenerTrabajosDeMedico(id_medico) {
        try {
            const db = new Database();
            await db.connect();
            const query = `SELECT t.*, c.nombre AS clinica
                            FROM trabajos AS t
                            INNER JOIN clinicas AS c
                            ON t.id_clinica = c.id
                            WHERE id_medico = ?`;
            const params = [id_medico];
            const resultado = await db.query(query, params);
            await db.close();

            return resultado;
        } catch (error) {
            throw new Error('Error al obtener los trabajos del medico de la base de datos');
        }
    }
}

module.exports = Trabajo;
