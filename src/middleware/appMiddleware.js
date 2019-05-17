// setup global middleware
import morgan from 'morgan';
import bodyParser from 'body-parser';

module.exports = function(app) {
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
};