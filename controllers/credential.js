let credentials_cache = {}
let verifi = function(req, res) {
    var body = req.body;
    let key = body.key;
    let shared_secret = body.shared_secret;
    console.log("LLEGO A VERIFICAR", key, shared_secret);
    if (typeof credentials_cache[key] !== 'undefined') {
        console.log('ENTRO A QUE LA CREDENCIAL Si EXISTE');
        res.sendStatus(403);
    } else {
        credentials_cache[key] = { key: key, shared_secret: shared_secret };
        console.log('ENTRO A QUE LA CREDENCIAL NO EXISTE');
        res.sendStatus(204);
    }


}
let getSecret = function(key) {
    console.log("EN getSecret: ", credentials_cache[key]);
    const r = (typeof credentials_cache[key] !== 'undefined') && credentials_cache[key].shared_secret;
    return r;
}
module.exports = {
    verifi,
    getSecret
}