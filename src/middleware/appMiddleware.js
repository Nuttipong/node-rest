// setup global middleware
var morgan = require('morgan');
var bodyParser = require('body-parser');
var error = require('./erorr');

module.exports = function(app) {
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // setup global error handling
    app.use(error);
};