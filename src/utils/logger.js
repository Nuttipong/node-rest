require('colors');
var _ = require('lodash');
var config = require('../config');

var consoleLog = config.logging ? console.log.bind(console) : {};
var logger = {
    log: function() {
        var args = _.toArray(arguments)
                    .map((arg) => {
                        if (typeof(arg) === 'object') {
                            return JSON.stringify(arg).yellow;
                        } else {
                            arg += '';
                            return arg.yellow;
                        }
                    });
        if (consoleLog.apply)
            consoleLog.apply(console, args);
    }
};

module.exports = logger;