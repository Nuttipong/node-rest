(function () {

    const Promise = require('bluebird');
    const logger = require('../../utils/logger');
    const Database = require('./database');
    const database = new Database().getInstance();

    // create all repositories
    const StoreRepository = require('../storeRepository');

    function seedDatabase() {

        database.getDb(function (err, theDb) {
            if (err) {
                logger.log('Could not connect to database', err);
            } else {
                logger.log('Connected to database');

                if (config.env === 'staging')
                    dropTable();

                const storeRepository = new StoreRepository(theDb);

                // create table as parallel
                Promise.all([
                    storeRepository.createTable(),
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

    async function dropTable() {
        await database.dropAll();
    }

    seedDatabase();

})(module.exports);