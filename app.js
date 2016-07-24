/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------
require('dotenv').load();

var express = require('express');
var router = express.Router();
var Cloudant = require('cloudant');
var cfenv = require('cfenv');
var bodyParser = require('body-parser')
var routes = require('./routes/index');

// create a new express server
var app = express();
app.use(bodyParser.json());
app.use('/',routes);
//app.use(express.static(__dirname + '/public')); //setup static public directory
//app.use('/', routes);

/*------------------------Cloudant------------------------*/

var username = process.env.cloudant_username || "nodejs";
var password = process.env.cloudant_password;
var cloudant = Cloudant({account:username, password:password});

// ------------------ Services ------------------------

/*------------------------------------------------------------*/
// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
module.exports = app;
