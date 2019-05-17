import devEnv from './development';
import stagingEnv from './staging';
import { expect } from 'chai';

describe('Config', () => {

    it('should return development environment as expected', () => {
        // given
        const config = {
            env: 'development',
            port: 8080,
            logging: true,
            dbFile: 'storage.db'
        };
        // then
        expect(devEnv).to.deep.equal(config);
    });

    it('should return staging environment as expected', () => {
        // given
        const config = {
            env: 'staging',
            port: 8070,
            logging: false,
            dbFile: 'storage.test.db'
        };
        // then
        expect(stagingEnv).to.deep.equal(config);
    });

});