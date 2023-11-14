const express = require('express');
const bodyParser = require('body-parser');
const usuariosRouter = require('./usuariosRouter');
const especialidadesRouter = require('./especialidadesRouter');
const medicosRouter = require('./medicosRouter');

function routerApi(app) {
    app.use(bodyParser.json());
    app.use('/especialidades', especialidadesRouter);
    app.use('/medicos', medicosRouter);
    app.use('/usuario', usuariosRouter);
}

module.exports = routerApi;
