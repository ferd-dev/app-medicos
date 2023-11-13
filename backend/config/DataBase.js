const mysql = require('mysql');
require('dotenv').config();

class Database {
    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
        });
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.connection.connect((error) => {
                if (error) {
                    reject(error);
                } else {
                    console.log('Conexión exitosa a la base de datos');
                    resolve();
                }
            });
        });
    }

    query(sql, params) {
        return new Promise((resolve, reject) => {
            // Ejecutar una consulta SQL en la base de datos
            this.connection.query(sql, params, (error, results) => {
                if (error) {
                    reject(error); // Rechazar la promesa si hay un error en la consulta
                } else {
                    resolve(results); // Resolver la promesa con los resultados de la consulta
                }
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end((error) => {
                if (error) {
                    reject(error);
                } else {
                    console.log('Conexión cerrada');
                    resolve();
                }
            });
        });
    }
}

module.exports = Database;
