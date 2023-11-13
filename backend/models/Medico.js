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
}

module.exports = Medico;
