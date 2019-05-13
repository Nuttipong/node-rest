(function (controllers) {

    var storeController = require('./store/storeController');

    controllers.init = function (app) {
        storeController.init(app);
    };

})(module.exports);