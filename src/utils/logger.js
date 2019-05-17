import 'colors';
import Config from '../config/index';

class Logger {
    constructor () {
        if (!Logger.instance) {

            this.config = new Config();
            this.consoleLog = this.config.logging ? console.log.bind(console) : {};

            Logger.instance = this;
        }
    }

    getInstance () {
        return Logger.instance;
    }

    log() {
        const args = Array.from(arguments)
                          .map((arg) => {
                            if (typeof(arg) === 'object') {
                                return JSON.stringify(arg).green;
                            } else {
                                arg += '';
                                return arg.green;
                            }
                          });

        if (this.consoleLog.apply)
            this.consoleLog.apply(console, args);
    }
}

module.exports = Logger;