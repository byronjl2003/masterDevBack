var express = require('express');
var controller = require('../controllers/message')
var mdAutenticacion = require('../middleware/autenticacion');
var app = express();


//QUITAR
app.get('/', (req, res) => {

    controller.getAll(req, res)


});

//[mdAutenticacion.autenticar],
app.get('/:id', [mdAutenticacion.autenticar], (req, res) => {

    controller.getMessage(req, res)


});



app.post('/', [mdAutenticacion.autenticar], (req, res) => {

    controller.storeMessage(req, res)



});

module.exports = app;