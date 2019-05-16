(function (controllers) {

    controllers.createRoute = function () {

        const router = require('express').Router();
        const storeRoute = require('./store/storeController');

        router.use('/store', storeRoute);

        return router;
    };

})(module.exports)





