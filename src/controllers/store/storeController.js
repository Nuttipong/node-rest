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
        this.timeService = new TimeService();

        // GET
        this.router.get('/:key', (req, res) => {
            const key = req.params.key;
            this.storeRepository.getByKey(key)
                .then((results) => {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200);
                    res.json(results || []);
                });
        });

        // POST & UPDATE
        this.router.post('/', (req, res) => {
            const dto = Object.entries(req.body)[0];
            const timestamp = this.timeService.getCurrentUnixTime(Date.now());
            const payload = {
                key: dto[0],
                value: dto[1],
                timestamp: timestamp
            };
            this.storeRepository.insertOrUpdate(payload)
                .then((result) => {
                    let objResult, statusCode;
                    if (result === 'success') {
                        statusCode = 200;
                        objResult = Object.assign({}, payload);
                    } else {
                        statusCode = 500;
                        objResult = result;
                    }

                    res.setHeader('Content-Type', 'application/json');
                    res.status(statusCode);
                    res.json(objResult);
                });
        });
    }
}