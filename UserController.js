var cryptoUtil = require('./CryptoUtil');
var User   = require('./app/models/user'); // get our mongoose model
var config = require('./config'); // get our config file
function UserController(){
  this.setup=function(req, res) {
  // create a sample user
  var nick = new User({ 
    name: 'admin', 
    password: cryptoUtil.encrypt('password'),
    admin: true 
  });

  // save the sample user
  nick.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
};

this.authenticate=function(req, res) {
//    console.log(req.body.name);
//    console.log(req.body.password);
      // find the user
      User.findOne({
        name: req.body.name
      }, function(err, user) {

        if (err) throw err;

      if (!user) {
          res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

          // check if password matches
          if (cryptoUtil.decrypt(user.password) != req.body.password) {
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
          } else {
            var token=cryptoUtil.createToken(user);              
            // return the information including token as JSON
            res.json({
              success: true,
              message: 'Enjoy your token!',
              token: token
            });
          }   

        }

      });
    };
    
 this.users=function(req, res) {
  User.find({},{ password:0 }, function(err, users) {
    res.json(users);
  });
 };
    
}

module.exports=new UserController();