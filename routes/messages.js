var express = require('express');
var controller = require('../controllers/message');
var mdAutenticacion = require('../middleware/autenticacion');
var app = express();


app.get('/:tag', [mdAutenticacion.autenticar], (req, res) => {

    controller.getMessage_tag(req, res)




});

module.exports = app;