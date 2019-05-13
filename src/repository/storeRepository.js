var Promise = require('bluebird');

class StoreRepository {
    constructor(dao) {
        if (!StoreRepository.dao) {
            StoreRepository.dao = dao;
        }
    }

    createTable() {
        var sql = `CREATE TABLE IF NOT EXISTS tbl_store (
            key TEXT PRIMARY KEY,
            value BLOB,
            createDate INTEGER,
            modifyDate INTEGER
        )`;
        return StoreRepository.dao.run(sql);
    };

    getByKey(key) {
        var sql = `SELECT * FROM tbl_store WHERE key = ?`;
        return new Promise((resolve, reject) => {
            StoreRepository.dao.get(sql, [key], (err, result) => {
                if (err) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        })
        .catch((err) => {
            throw err;
        });
    }

    async insertOrUpdate(payload) {
        var hasKey = await this.getByKey(payload.key);
        var sql = ``;
        if (hasKey) {
            sql = `UPDATE tbl_store
                SET key = ?,
                    value = ?,
                    modifyDate = ?
                WHERE key = ?
                `;
        } else {
            sql = `INSERT INTO tbl_store (key, value, createDate)
                VALUES (?)
            `;
        }
        return StoreRepository.dao.run(sql, [payload.key, payload.value, payload.timestamp]);
    }
}

module.exports = StoreRepository;