var credentials_controller = require('../controllers/credential');
var CryptoJS = require('crypto-js');

exports.autenticar = function(req, res, next) {

    console.log("En el middleware de autenticacion");
    let xkey = req.header('X-Key');
    let xroute = req.header('X-Route');
    let xsignature = req.header('X-Signature');
    console.log("xkey:", xkey);
    console.log("xroute:", xroute);
    console.log("xsignature", xsignature)
        //VERIFICACION QUE LOS HEADERS REQUERIDOS
    if (typeof xkey == 'undefined' || typeof xroute == 'undefined' || typeof xsignature == 'undefined') {
        return res.status(403).json({
            ok: false,
            message: "Error de Headers"

        });
    }
    //VERIFICO QUE EL CONTENIDO DE X-Route sea igual al request
    console.log("REQ ORIGNAL: ", req.originalUrl)
    if (req.originalUrl != xroute) {
        return res.status(403).json({
            ok: false,
            message: `No conincide xroute con el path del request [${req.originalUrl} -> ${xroute}]`

        });
    }

    //SE VERIFICA QUE EL KEY  EXISTA
    let secreto = credentials_controller.getSecret(xkey);
    console.log("SECRETO RECUPERADO:: ", secreto);
    if (!secreto) {
        return res.status(403).json({
            ok: false,
            message: "Key invalido"

        });
    }

    //SE PROCEDE A VERIFICAR LA FIRMA
    //SE CONCATENA LOS PARAMETROS DE BODY
    let body = req.body;
    let arreglodeparametros = []

    for (var key in body) {
        arreglodeparametros.push(`${key}${body[key]}`);

    }
    //SE CONCATENA LOS PAREMETROS QUE BIENEN EN LA URL

    for (var key in req.params) {
        arreglodeparametros.push(`${key}${req.params[key]}`)


    }


    //SE CONCATENAN LOS PARAMETROS QUE BIENEN COMO QUERY STRING... POR SI LAS DUDAS..

    for (var key in req.query) {
        arreglodeparametros.push(`${key}${req.query[key]}`)

    }
    //SE AGREGA EL X-ROUTE
    //cadena += xroute;
    arreglodeparametros.push(`X-Route${xroute}`);
    arreglodeparametros.sort();

    let cadena = arreglodeparametros.reduce((acc, element) => `${acc};${element}`);
    let words = CryptoJS.HmacSHA256(cadena, secreto);
    let hex = words.toString(CryptoJS.enc.Hex);


    console.log("CADENA YA CONCATENADA:: ", cadena);
    console.log("hex:: ", hex);
    //if (xkey === "HOLA") {
    if (hex === xsignature) {
        next();
        return
    } else {
        return res.status(403).json({
            ok: false,
            message: "Signatura invalida"

        });
    }








}