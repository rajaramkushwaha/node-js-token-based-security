module.exports = {
    'env':'dev'
    ,'db':{        
        'database'  : 'mongodb://localhost:27017/secure-db',
        }
    ,'security':{
       expiresIn:1440 
      ,'tokenSecret':'ilovescotchyscotch'     
      ,'cypherKey' :'\x8d\xcc\xbd\x39\xeb\x21\xe5\x20\xe2\x12\xd3\x8c\x45\xc2\x3f\xdf\x63\x5e\x3f\x58\xac\x9b\xcd\x2f\x84\xf1\x6e\x6d\x8c\x1e\xef\xa1'
      ,'hmacKey'   :'\x96\x90\xbf\x4d\xa4\x76\xfa\x4d\x34\x5c\xd6\xc5\xd9\x3e\xeb\x75\x93\x45\xd5\xb1\x67\xd2\x36\x06\x98\xe1\xd0\x47\x8c\x5b\x4f\x4f'
      ,'ALGORITHM':'AES-256-CBC'
      ,'HMAC_ALGORITHM':'SHA256'
      ,'encoding':'hex'
      ,'decryptedTxtEncoding':'utf-8'        
    }
  };

// expiresIn: Minutes