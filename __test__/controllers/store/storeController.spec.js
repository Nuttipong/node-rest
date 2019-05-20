import supertest from 'supertest';
import app from '../../../src/app';
import Database from '../../../src/repository/dao/database';
import StoreRepository from '../../../src/repository/storeRepository';
import fs from 'fs';
import path from 'path';
import httpStatus from 'http-status';
import appRoot from 'app-root-path';

describe("StoreController Api", () => {

    let mockData = [];
    
    beforeAll(async() => {
        const rawData = fs.readFileSync(path.join(appRoot.path, '\\__test__\\mock\\store.json'));
        if (!rawData) {
            throw new Exception('No such a data');
        }
        mockData = JSON.parse(rawData);
        await initializeDatabase();
    });

    afterAll(async() => {

    });

    describe('### GET /store/:key', () => {
        it('should response the GET method with mockKey properly', async () => {
            // given
            const mockKey = 'key1';

            // when
            const actual = await supertest(app).get(`/api/store/${mockKey}`);
            const { key, value, timestamp } = actual.body;
            const expecetd = mockData.find((data) => data.key === key);

            // then
            expect(actual.statusCode).toBe(httpStatus.OK);
            // and
            expect(expecetd).not.toBeNull();
            // and
            expect(key).toEqual(expecetd.key);
            // and
            expect(value).toEqual(expecetd.value);
            // and
            expect(timestamp).toEqual(expecetd.timestamp);
        });
    });
    
    describe('### POST /store', () => {
        it('should return the created or update key properly', async () => {
            // given
            const mockPayload = { "key3": "value5" };

            // when
            const actual = await supertest(app).post(`/api/store`).send(mockPayload);
            const { key, value, timestamp } = actual.body;

            // then
            expect(actual.statusCode).toBe(httpStatus.OK);
            // and
            expect(key).toEqual("key3");
            // and
            expect(value).toEqual("value5");
            // and
            expect(timestamp).toBeDefined();
        });
    });

    async function initializeDatabase() {
        const dao = new Database().getInstance();
        const repo = new StoreRepository(dao);
        return await new Promise((resolve, reject) => {
            repo.createTable()
                .then(async() => {
                    for (const data of mockData) {
                        const res = await repo.insertOrUpdate(data);
                        if (res !== 'success') {
                            throw new Exception(res);
                        }
                    }
                    resolve('success');
                }, (err) => {
                    reject(err);
                });
        });
    }

});