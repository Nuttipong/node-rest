(function (database) {

    var sqlite3 = require('sqlite3');
    var dbFilePath = `${__dirname}\\storage.db`;
    var theDb = null;

    database.getDb = function (next) {
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

})(module.exports);