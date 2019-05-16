
const config = require('./src/config');
const app = require('./src/server');

// logger is a wrapper around console.log that adds color
// logs object as a json and ability to turn off
const logger = require('./src/utils/logger');

// start app
app.listen(config.port, (err) => {
    if (err) {
        throw err;
    }
});

logger.log('Listening on http://localhost:' + config.port);
