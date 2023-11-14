const Database = require('../config/DataBase');

class Clinica {
    constructor(id, nombre, telefono, departamento, municipio, direccion) {
        this.id = id;
        this.nombre = nombre;
        this.telefono = telefono;
        this.departamento = departamento;
        this.municipio = municipio;
        this.direccion = direccion;
    }

    static async obtenerClinicas() {
        try {
            const db = new Database();
            await db.connect();
            const query = 'SELECT * FROM clinicas WHERE activo = 1 ORDER BY id DESC LIMIT 5';
            const resultado = await db.query(query);
            await db.close();

            const clinicas = resultado.map(clinica => {
                const { id, nombre, telefono, departamento, municipio, direccion } = clinica;
                return new Clinica(id, nombre, telefono, departamento, municipio, direccion);
            });

            return clinicas;
        } catch (error) {
            throw new Error('Error al obtener las clinicas de la base de datos');
        }
    }
}

module.exports = Clinica;
