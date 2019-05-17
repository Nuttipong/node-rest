
import Config from './config';
import Logger from './utils/logger';
import app from './server';

const config = new Config();
const logger = new Logger().getInstance();

app.listen(config.port, (err) => {
    if (err) {
        throw err;
    }
    logger.log('App listening on http://localhost:' + config.port);
});

module.exports = app;
