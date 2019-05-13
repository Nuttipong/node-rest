(function () {

    var Promise = require('bluebird');
    var logger = require('../utils/logger');
    var database = require('./database');
    var StoreRepository = require('../repository/storeRepository');

    function seedDatabase() {
        database.getDb(function (err, theDb){
            if (err) {
                logger.log('Could not connect to database', err);
            } else {
                logger.log('Connected to database');

                var storeRepo = new StoreRepository(theDb);

                // create table as parallel
                Promise.all([
                    storeRepo.createTable(),
                    // table 2,
                    // table 3
                ])
                .then((tasks) => {
                    if (tasks) {
                        logger.log('All tasks finished');
                    }
                });
            }
        });
    }

    seedDatabase();

})(module.exports);