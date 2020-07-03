var express = require('express');
var controller = require('../controllers/message');
var mdAutenticacion = require('../middleware/autenticacion');
var app = express();


app.get('/:limit', (req, res) => {

    let li = req.params.limit;
    let resp = [];
    for (let i = 0; i < li; i++) {
        resp[i] = { id: i, message: `HOLA ${i}`, img: 'https://www.pngitem.com/pimgs/m/424-4242297_gopher-golang-hd-png-download.png' };
    }
    res.status(200).json({
        ok: true,
        data: resp
    });




});

module.exports = app;