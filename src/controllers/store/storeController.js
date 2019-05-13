(function (storeController) {

    var StoreRepository = require('../../repository/storeRepository');
    // var validation = require('../../repository/storeValidation');
    var TimeService = require('../../services/timeService');
    var _ = require('lodash');
    
    storeController.init = function (app) {

        var repo = new StoreRepository();

        app.get('/v1/api/store/', function(req, res) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.json(keys);
        });

        app.get('/v1/api/store/:key/', function(req, res) {
            var key = req.params.key;

            repo.getByKey(key)
                .then((results) => {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200);
                    res.json(results || []);
                });
        });
        
        app.post('/v1/api/store/', function(req, res) {
            var obj = Object.entries(req.body)[0];
            var payload = {
                key: obj[0],
                value: obj[1],
                timestamp: TimeService.getCurrentUnixTime(Date.now())
            };

            repo.insertOrUpdate(payload)
                .then((result) => {
                    var objResult = _.assign({}, payload);

                    res.setHeader('Content-Type', 'application/json');
                    res.status(200);
                    res.json(objResult);
                });
        });
    }

})(module.exports);