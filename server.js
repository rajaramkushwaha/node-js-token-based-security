// =======================
// get the packages we need ============
// =======================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var config = require('./config'); // get our config file
var securityFilter = require('./SecurityFilter');

userController=require('./UserController');

// =======================
// configuration =========
// =======================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.db.database); // connect to database
//app.set('superSecret', config.security.tokenSecret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan(config.env));

app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port );
});

// API ROUTES -------------------
// we'll get to these in a second

// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);


// API ROUTES -------------------
// get an instance of the router for api routes
var apiRoutes = express.Router(); 
apiRoutes.get('/public/setup',userController.setup);
apiRoutes.post('/public/authenticate',userController.authenticate);


//////////////////////////////////////////////////
/// Drawing boundary line for secure and insecure api Below apis are secure
//////////////////////////////////////////////////
apiRoutes.use(securityFilter.filterToken );
apiRoutes.get('/protected/users',userController.users );

// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);
