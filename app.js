// Requires
var createError = require('http-errors');

var express = require('express');

var bodyParser = require('body-parser');

// Inicializar variables
var app = express();


// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,X-Key,X-Route,X-Signature");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});


// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Importar rutas
var appRoutes = require('./routes/app');
var credentialRoutes = require('./routes/credential');
var messageRoutes = require('./routes/message');
var messagesRoutes = require('./routes/messages');
var pruebaRoutes = require('./routes/prueba');

// Rutas
app.use('/credential', credentialRoutes);
app.use('/message', messageRoutes);
app.use('/messages', messagesRoutes);
app.use('/prueba', pruebaRoutes);


app.use('/', appRoutes);
// catch 404 and forward to error handler
/*
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    //res.status(err.status || 500).send('Algo salio mal !');
    res.status(err.status || 500).send(err.message);
    //res.render('error');
});
*/

// Escuchar peticiones
app.listen(3001, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});