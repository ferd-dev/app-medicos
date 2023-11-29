const express = require('express');
const bodyParser = require('body-parser');
const usuariosRouter = require('./usuariosRouter');
const especialidadesRouter = require('./especialidadesRouter');
const medicosRouter = require('./medicosRouter');
const clinicasRouter = require('./clinicasRouter');
const trabajosRouter = require('./trabajosRouter');
const estudiosRouter = require('./estudiosRouter');

function routerApi(app) {
    app.use(bodyParser.json());
    app.use('/especialidades', especialidadesRouter);
    app.use('/medicos', medicosRouter);
    app.use('/usuario', usuariosRouter);
    app.use('/clinicas', clinicasRouter);
    app.use('/trabajos', trabajosRouter);
    app.use('/estudios', estudiosRouter);
}

module.exports = routerApi;
