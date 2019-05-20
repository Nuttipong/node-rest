import Database from '../../../src/repository/dao/database';
import sqlite3 from 'sqlite3';

jest.mock('sqlite3');

describe('Seed Database', () => {
    it('should create instance correctly', () => {
        // given
        const firstDatabase = new Database().getInstance();
        const secondDatabase = new Database().getInstance();

        // then
        expect(firstDatabase).toEqual(secondDatabase);
    });

    it('should seed database correctly on multiple time', () => {
        // given
        const database = new Database().getInstance();
        const mockCallback = jest.fn();

        // when
        ['1', '2'].forEach(() => {
            database.getDb(mockCallback);

            // then
            expect(mockCallback).toHaveBeenCalled();
            // and
            expect(mockCallback).toHaveBeenCalledWith(null, database.theDb);
        });
    });
});