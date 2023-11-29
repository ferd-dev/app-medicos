const Database = require('../config/DataBase');

class Estudio {
    constructor(id, id_medico, id_tipo_estudio, titulo, instituto, anio_inicio, anio_fin, timepo_meses, activo) {
        this.id = id;
        this.id_medico = id_medico;
        this.id_tipo_estudio = id_tipo_estudio;
        this.titulo = titulo;
        this.instituto = instituto;
        this.anio_inicio = anio_inicio;
        this.anio_fin = anio_fin;
        this.timepo_meses = timepo_meses;
        this.activo = activo;
    }

    static async obtenerEstudiosDeMedico(id_medico) {
        try {
            const db = new Database();
            await db.connect();
            const query = `SELECT e.*, t.nombre AS tipo_estudio
                            FROM estudios AS e
                            INNER JOIN tipos_estudios AS t
                            ON e.id_tipo_estudio = t.id
                            WHERE id_medico = ?`;
            const params = [id_medico];
            const resultado = await db.query(query, params);
            await db.close();

            return resultado;
        } catch (error) {
            throw new Error('Error al obtener los estudios del medico de la base de datos');
        }
    }
}

module.exports = Estudio;
