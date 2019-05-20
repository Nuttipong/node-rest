import 'colors';
import Logger from '../../src/utils/logger';

describe('Logger', () => {
    let logger;

    beforeEach(() => {
        logger = new Logger().getInstance();
    });

    afterEach(() => {
        logger = null;
    })

    it('should return logger instance as singleton properly', () => {
        // given
        const expected = logger;

        // when
        const actual = new Logger().getInstance();

        // then
        expect(actual).toStrictEqual(expected);
    });

    it('should called log() function with string properly', () => {
        // given
        const message = 'fake';
        const mockFn = jest.fn();
        logger.consoleLog.apply = mockFn;
        
        // when
        logger.log(message);

        // then
        expect(mockFn).toHaveBeenCalled();
    });

    it('should called log() function with object properly', () => {
        // given
        const message = {fake: 1};
        const mockFn = jest.fn();
        logger.consoleLog.apply = mockFn;
        
        // when
        logger.log(message);

        // then
        expect(mockFn).toHaveBeenCalled();
    });
});