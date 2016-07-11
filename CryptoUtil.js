var crypto = require('crypto');
var config = require('./config'); // get our config file
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

    function CryptoUtil(){
    var  ALGORITHM, KEY, HMAC_ALGORITHM, HMAC_KEY;
    ALGORITHM = config.security.ALGORITHM; // CBC because CTR isn't possible with the current version of the Node.JS crypto library
    HMAC_ALGORITHM = config.security.HMAC_ALGORITHM;
    KEY =new Buffer(config.security.cypherKey,"binary");
    //crypto.randomBytes(32); // This key should be stored in an environment variable
    HMAC_KEY = new Buffer(config.security.hmacKey,'binary'); 
    //crypto.randomBytes(32); // This key should be stored in an environment variable
    
    console.log(KEY);
    console.log(HMAC_KEY);
        
    this.encrypt = function (plain_text) {
    var IV = new Buffer(crypto.randomBytes(16)); // ensure that the IV (initialization vector) is random
    var cipher_text;
    var hmac;
    var encryptor;

    encryptor = crypto.createCipheriv(ALGORITHM, KEY, IV);
    encryptor.setEncoding(config.security.encoding);
    encryptor.write(plain_text);
    encryptor.end();

    cipher_text = encryptor.read();

    hmac = crypto.createHmac(HMAC_ALGORITHM, HMAC_KEY);
    hmac.update(cipher_text);
    hmac.update(IV.toString(config.security.encoding)); // ensure that both the IV and the cipher-text is protected by the HMAC

        // The IV isn't a secret so it can be stored along side everything else
    return cipher_text + "$" + IV.toString(config.security.encoding) + "$" + hmac.digest(config.security.encoding) 

    };

    this.decrypt = function (cipher_text) {
        var cipher_blob = cipher_text.split("$");
        var ct = cipher_blob[0];
        var IV = new Buffer(cipher_blob[1], config.security.encoding);
        var hmac = cipher_blob[2];
        var decryptor;

        chmac = crypto.createHmac(HMAC_ALGORITHM, HMAC_KEY);
        chmac.update(ct);
        chmac.update(IV.toString(config.security.encoding));

        if (!this.constant_time_compare(chmac.digest(config.security.encoding), hmac)) {
            console.log("Encrypted Blob has been tampered with...");
            return null;
        }

        decryptor = crypto.createDecipheriv(ALGORITHM, KEY, IV);
        decryptor.update(ct, config.security.encoding, config.security.decryptedTxtEncoding);
        return  decryptor.final(config.security.decryptedTxtEncoding);


    };

    this.constant_time_compare = function (val1, val2) {
        var sentinel;

        if (val1.length !== val2.length) {
            return false;
        }
        for (var i = 0; i <= (val1.length - 1); i++) {
            sentinel |= val1.charCodeAt(i) ^ val2.charCodeAt(i);
        }
        return sentinel === 0
    };
    this.createToken=function(user){    
        var token = jwt.sign(user, config.security.tokenSecret, {
              expiresIn: 1440 // expires in 24 hours
            });
    return token;
    };
        
}

module.exports=new CryptoUtil();

