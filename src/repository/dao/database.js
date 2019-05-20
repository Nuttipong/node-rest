import sqlite3 from 'sqlite3';
import Config from '../../config';

export default class Database {

    constructor () {
        if (!!Database.instance) {
            return Database.instance;
        }

        const config = new Config();
        this.dbFilePath = `${__dirname}\\${config.dbFile}`;
        this.theDb = null;

        Database.instance = this;
    }

    getInstance () {
        return Database.instance;
    }

    getDb (next) {
        if (!this.theDb) {
            // connect to the database
            this.theDb = new sqlite3.Database(this.dbFilePath, (err) => {
                if (err) {
                    next(err, null);
                }
            });
        }
        next(null, this.theDb);
    }
}