var _ = require('lodash');
var config = {
    env: process.env.NODE_ENV || 'development'
};
var envConfig = require(('./' + config.env).trim().toLowerCase());

module.exports = _.assign(config, envConfig || {});