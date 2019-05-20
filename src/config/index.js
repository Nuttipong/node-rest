const config = {
    env: process.env.NODE_ENV || 'development'
};
const envConfig = require(('./' + config.env).trim().toLowerCase());

export default class Config {
    constructor () {
        this.env = envConfig.env;
        this.port = envConfig.port;
        this.logging = envConfig.logging;
        this.dbFile = envConfig.dbFile;
    }
}