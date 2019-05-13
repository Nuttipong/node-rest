var express = require('express');
var app = express();
var controllers = require('./controllers');

// setup the app middleware
require('./middleware/appMiddleware')(app);

// setup database
require('./dao');

// map the routes
controllers.init(app);

// export the app for testing
module.exports = app;