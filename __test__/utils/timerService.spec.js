import TimeService from '../../src/utils/timeService';

describe('TimeService', () => {
    it('should retrun timestamp as second', () => {
        // given
        const service = new TimeService();
        const timestamp = Date.now(); // represet as millisecond
        const expected = Math.floor(timestamp / 1000);

        // when
        const actual = service.getCurrentUnixTime(timestamp);

        // then
        expect(actual).toEqual(expected);
    });
});