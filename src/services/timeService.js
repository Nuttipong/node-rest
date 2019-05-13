(function (timeService) {

    timeService.getCurrentUnixTime = function (time) {
        return Math.floor(time / 1000);
    };

})(module.exports);