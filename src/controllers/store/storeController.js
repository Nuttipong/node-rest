// import lib
const router = require('express').Router();
const _ = require('lodash');

// import validations, services, repositories and so on
const StoreRepository = require('../../repository/storeRepository');
const TimeService = require('../../services/timeService');

// new instance
const timeService = new TimeService();
const storeRepository = new StoreRepository();

router.get('/:key', function (req, res) {
    const key = req.params.key;
    storeRepository.getByKey(key)
        .then((results) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.json(results || []);
        });
});

router.post('/', function (req, res) {
    const dto = Object.entries(req.body)[0];
    const payload = {
        key: dto[0],
        value: dto[1],
        timestamp: timeService.getCurrentUnixTime(Date.now())
    };
    storeRepository.insertOrUpdate(payload)
        .then((result) => {
            var objResult = _.assign({}, payload);

            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.json(objResult);
        });
});

module.exports = router;
