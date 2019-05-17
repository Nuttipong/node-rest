import Database from './database';
import Logger from '../../utils/logger';

export default class AppDao {
    constructor () {
        this.database = new Database().getInstance();
        this.logger = new Logger().getInstance();
    }

    seedDatabase() {
        const self = this;
        self.database.getDb((err, theDb) => {
            if (err || !theDb) {
                self.logger.log('Could not connect to database', err);
            } else {
                self.logger.log('Connected to database');
            }
        });
    }
}