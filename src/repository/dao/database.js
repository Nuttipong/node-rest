const sqlite3 = require('sqlite3');
const config = require('../../config');
const dbFilePath = `${__dirname}\\${config.dbFile}`;
let theDb = null;

class Database {

    constructor () {
        if (!!Database.instance) {
            return Database.instance;
        }

        Database.instance = this;
    }

    getInstance () {
        return Database.instance;
    }

    getDb (next) {
        if (!theDb) {
            // connect to the database
            theDb = new sqlite3.Database(dbFilePath, (err) => {
                if (err) {
                    next(err, null);
                }
            });
        }

        next(null, theDb);
    }

    dropAll () {
        return new Promise((resolve, reject) => {
            const sql = `DROP TABLE IF EXISTS tbl_store;`;
            return theDb.run(sql, (err) => {
                if (err) {
                    console.log('Error running sql ' + sql);
                    console.log(err);
                    reject(err);
                } else {
                    resolve(null);
                }
            });
        });
    }
}

module.exports = Database;