import Database from '../../src/repository/dao/database';
import StoreRepository from '../../src/repository/storeRepository';
import { QUERY_CREATE_TABLE_TBL_STORE,
    QUERY_SELECT_TBL_STORE_BY_KEY,
    QUERY_UPDATE_TBL_STORE_BY_KEY,
    QUERY_INSERT_TBL_STORE_BY_KEY
} from '../../src/repository/storeRepository';

jest.mock('../../src/repository/dao/database');

describe('StoreRepository', () => {

    let mockDaoInstance;
    let storeRepository;

    beforeAll(() => {
        mockDaoInstance = new Database();
    });

    afterEach(() => {
        //mockDaoInstance.mockClear;
    });

    it('should called createTable with successfully', async () => {
        // given
        const sql = QUERY_CREATE_TABLE_TBL_STORE;
        const mockFn = jest.fn().mockImplementation(() => {});

        mockDaoInstance.theDb = { run: mockFn };
        storeRepository = new StoreRepository(mockDaoInstance);

        // when
        const actual = await storeRepository.createTable();

        // then
        expect(mockFn).toHaveBeenCalled();
        // and
        expect(mockFn.mock.calls.length).toBe(1);
        // and
        expect(mockFn.mock.calls[0][0]).toBe(sql);
        // and
        expect(actual).toEqual('success');
    });

    it.only('should called getByKey with successfully', async () => {

        const mockCallback = jest.fn((a, b) => {
            console.log(a, a);
            console.log(b, b);
        });

        mockDaoInstance.theDb = {
            get: jest.fn((sql, [key], mockCallback) => {
                mockCallback(null, []);
            })
        };

        storeRepository = new StoreRepository(mockDaoInstance);

        await storeRepository.getByKey('');

        expect(mockDaoInstance.theDb.get).toHaveBeenCalled();

        expect(mockDaoInstance.theDb.get.mock.calls[0][2]).toHaveBeenCalled();

        // given
        // const fakeKey = 'fakeKey';
        // const sql = QUERY_SELECT_TBL_STORE_BY_KEY;
        // const mockFn = jest.fn().mockImplementation(() => {
        //     const err = new Error();
        //     const record = [];
        //     return {
        //         get: (cb) => cb(err, record)
        //     }
        // });

        // mockDaoInstance.theDb = { get: mockFn };
        // storeRepository = new StoreRepository(mockDaoInstance);

        // // when
        // await storeRepository.getByKey(fakeKey);

        // // then
        // expect(mockFn).toHaveBeenCalled();
        // // and
        // expect(mockFn.mock.calls.length).toBe(1);
        // // and
        // expect(mockFn.mock.calls[0][0]).toBe(sql);
    });

    it('should called getByKey with exception', (done) => {
        // given
        const fakeKey = 'fakeKey';
        const sql = QUERY_SELECT_TBL_STORE_BY_KEY;
        const mockCallback = jest.fn(() => {});
        const mockFn = jest.fn((cb) => cb(sql, mockCallback));

        mockDaoInstance.theDb = { get: mockFn };
        storeRepository = new StoreRepository(mockDaoInstance);

        // when
        storeRepository.getByKey(fakeKey);
        done();

        // then
        expect(mockFn).toHaveBeenCalled();
        // and
        expect(mockFn.mock.calls.length).toBe(1);
        expect(mockFn.mock.calls[0][0]).toBe(sql);
    });

    it('should called insertOrUpdate with successfully', (done) => {
        // given
        const fakePayload = 'fakeKey';
        const sql = QUERY_SELECT_TBL_STORE_BY_KEY;
        const mockCallback = jest.fn(() => {});
        const mockFn = jest.fn((cb) => cb(sql, mockCallback));

        mockDaoInstance.theDb = { get: mockFn };
        storeRepository = new StoreRepository(mockDaoInstance);

        // when
        storeRepository.getByKey(fakeKey);
        done();

        // then
        expect(mockFn).toHaveBeenCalled();
        // and
        expect(mockFn.mock.calls.length).toBe(1);
        expect(mockFn.mock.calls[0][0]).toBe(sql);
    });

    it('should called insertOrUpdate with exception', (done) => {
        // given
        const fakePayload = 'fakeKey';
        const sql = QUERY_SELECT_TBL_STORE_BY_KEY;
        const mockCallback = jest.fn(() => {});
        const mockFn = jest.fn((cb) => cb(sql, mockCallback));

        mockDaoInstance.theDb = { get: mockFn };
        storeRepository = new StoreRepository(mockDaoInstance);

        // when
        storeRepository.getByKey(fakeKey);
        done();

        // then
        expect(mockFn).toHaveBeenCalled();
        // and
        expect(mockFn.mock.calls.length).toBe(1);
        expect(mockFn.mock.calls[0][0]).toBe(sql);
    });
});