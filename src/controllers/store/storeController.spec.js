// lib for testing purpose
const supertest = require('supertest-as-promised');
const httpStatus = require('http-status');
const expect = require('chai');
const sinon  = require('sinon');
require('sinon-as-promised');

// app module
const config = require('../../config');
const app = require('../../server');
const StoreRepository = require('../../repository/storeRepository');
const TimeService = require('../../../src/services/timeService');

describe("storeController", () => {

    let sandbox;
    let storeRepository;

    before((done) => {
        storeRepository = new StoreRepository();
        timeService = new TimeService();

        storeRepository.insertOrUpdate({
            value: 'fakeValue1', 
            timestamp: timeService.getCurrentUnixTime(Date.now()),
            key: 'fakeKey1'
        })
        .then(() => {
            done();
        });
    });

    beforeEach((done) => {
        sandbox = sinon.sandbox.create();
        done();
    });
    
    afterEach((done) => {
        sandbox.restore();
        done();
    });

    describe('### GET /store/:key', () => {
  
    });
    
    describe('### POST /store', () => {
        it('should return the created new key successfully', (done) => {
            // given
            const mockPayload = {
                value: 'fakeValue2', 
                timestamp: timeService.getCurrentUnixTime(Date.now()),
                key: 'fakeKey2'
            };

            supertest(app)
                .post('/api/store')
                .send(mockPayload)
                .expect(httpStatus.OK)
                .then(res => {
                    expect(res.body.key).to.exist;
                    expect(res.body.key).to.equal(mockPayload.key);
                    expect(res.body.value).to.exist;
                    expect(res.body.value).to.equal(mockPayload.value);
                    expect(res.body.timestamp).to.exist;
                    expect(res.body.timestamp).to.equal(mockPayload.timestamp);
                    done();
                });
        });
    });

});