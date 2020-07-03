var CryptoJS = require('crypto-js');
let data_cache = {};


function generateid(msg, tag) {
    console.log("En generateid");
    /*
    let words = CryptoJS.enc.Latin1.parse("HOLA MUNDO");
    console.log(words);
    let latin1 = CryptoJS.enc.Latin1.stringify(words);
    */
    let timestamp = Date.now();
    let cad = msg + tag + timestamp;
    let words = CryptoJS.SHA256(cad);
    str = words.toString(CryptoJS.enc.Hex);

    /*
        let timestamp = Date.now() + ""
        console.log("En generateid: ", msg, tag, timestamp)
        let dataencrypt = CryptoJS.SHA256(msg + tag + timestamp);
        let words = dataencrypt;
        let resp = CryptoJS.enc.Utf8.stringify(words);
        //resp = CryptoJS..stringify(resp)
        
        console.log("WORDS: ", words);
        console.log("resp:", resp);
        console.log("VERIFICACIOn::")


        return resp;
    */

    return str;
}

let storeMessage = function(req, res) {
    var body = req.body;
    let msg = body.msg;
    let tags = body.tags;
    let newid = generateid(msg, tags);
    let temp = {
        msg: msg,
        tags: tags,
        id: newid
    };

    data_cache[newid] = temp;



    res.status(200).json({
        ok: true,
        data: temp
    });

}

let getMessage = function(req, res) {
    var id = req.params.id;
    let value = data_cache[id];
    if (typeof value === 'undefined') {

        return res.status(400).json({
            ok: false,
            mensaje: 'No existe el mensage con el id ' + id,
            errors: { message: 'No existe el mensaje' }
        });

    }
    let dataaux = { id: value.id, msg: value.msg, tags: value.tags };
    res.status(200).json(dataaux);


}

let getMessage_tag = function(req, res) {
    var tag = req.params.tag;
    var mensajes = []
    for (var key in data_cache) {
        let value = data_cache[key];
        let tagslist = value.tags.split(".");
        if (tagslist.indexOf(tag) > -1) {
            mensajes.push(value);
        }





        // do something with "key" and "value" variables
    }
    res.status(200).json({
        ok: true,
        data: mensajes
    });




}

let getAll = function(req, res) {
    res.status(200).json({
        ok: true,
        data: data_cache
    });
}

module.exports = {
    storeMessage,
    getMessage,
    getMessage_tag,
    getAll
}