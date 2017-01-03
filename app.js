/*eslint-env node */

// set up ======================================================================
var express = require('express');

// create our app w/ express
var app = express();

// set the port
var port = process.env.PORT || 9000;

// mongoose for mongodb
var MongoPortable = require("mongo-portable");
// Instantiates a new object by passing a name
var db = new MongoPortable("exampleDb");
var mongoose = require('mongoose');

// load the database config
var database = db; //require('./config/database');

// log requests to the console (express4)
var morgan = require('morgan');
// pull information from HTML POST (express4)
var bodyParser = require('body-parser');
// simulate DELETE and PUT (express4)
var methodOverride = require('method-override');

// configuration ===============================================================
try {
  mongoose.connect(database.url);
} catch (err) {
  console.log(err);
}// connect to mongoDB database on modulus.io

// set static path
app.use(express.static(__dirname + '/public'));

// log every request to the console
app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({'extended': 'true'}));

// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());

// routes
require('./app/routes.js')(app);


app.listen(port);
console.log("App listening on port " + port);
