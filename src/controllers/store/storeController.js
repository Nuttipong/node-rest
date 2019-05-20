import express from 'express';
import Database from '../../repository/dao/database';
import StoreRepository from '../../repository/storeRepository';
import TimeService from '../../utils/timeService';

export default class StoreController {
    constructor () {
        // create route
        this.router = express.Router();
        this.dao = new Database().getInstance();
        this.storeRepository = new StoreRepository(this.dao);
        this.storeRepository.createTable();
        this.timeService = new TimeService();

        // GET
        this.router.get('/:key', (req, res, next) => {
            const key = req.params.key;

            this.storeRepository.getByKey(key)
                .then((result) => {
                    try {
                        res.status(200);
                        if (!result) { res.json({}); return; }
                        res.json({
                            key: result.key,
                            value: result.value,
                            timestamp: result.modifyDate
                        });
                    } catch (err) {
                        next(err);
                    }
                }, (err) => {
                    next(err);
                });
        });

        // POST & UPDATE
        this.router.post('/', (req, res, next) => {
            const dto = Object.entries(req.body)[0];
            const timestamp = this.timeService.getCurrentUnixTime(Date.now());
            const payload = {
                key: dto[0],
                value: dto[1],
                timestamp: timestamp
            };
            this.storeRepository.insertOrUpdate(payload)
                .then(() => {
                    res.status(200);
                    res.json(Object.assign({}, payload));
                }, (err) => {
                    res.status(500);
                    res.json(err);
                });
        });
    }
}