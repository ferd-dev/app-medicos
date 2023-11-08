const express = require('express');
const bodyParser = require('body-parser');
const especialidadesRouter = require('./especialidadesRouter');
const medicosRouter = require('./medicosRouter');


function routerApi(app) {
    app.use(bodyParser.json());
    app.use('/especialidades', especialidadesRouter);
    app.use('/medicos', medicosRouter);
}

module.exports = routerApi;
