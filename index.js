
var config = require('./src/config');
var app = require('./src/server');

// logger is a wrapper around console.log that adds color
// logs object as a json and ability to turn off
var logger = require('./src/utils/logger');

// start app
app.listen(config.port, (err) => {
    if (err) {
        throw err;
    }
});

logger.log('listening on http://localhost:' + config.port);
