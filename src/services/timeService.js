class TimeService {
    getCurrentUnixTime(time) {
        return Math.floor(time / 1000);
    }
}

module.exports = TimeService;

