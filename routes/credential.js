var express = require('express');
var controller = require('../controllers/credential')
var app = express();

app.put('/', (req, res) => {
    console.log('LLEGO AL PUT');
    controller.verifi(req, res);

});




module.exports = app;