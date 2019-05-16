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
                    console.log('Error running sql ' + sql);
                    console.log(err);
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

    insertOrUpdate(payload) {
        const { value, timestamp, key } = payload;
        let sql = ``;
        return this.getByKey(key)
            .then((hasKey) => {
                if (hasKey) {
                    const modifyDate = timestamp;
                    sql = `UPDATE tbl_store SET value = (?), modifyDate =(?) WHERE key = (?);`;
                    return StoreRepository.dao.run(sql, [value, modifyDate, key]);
                } else {
                    const createDate = timestamp;
                    sql = `INSERT INTO tbl_store (key, value, createDate) VALUES (?, ?, ?);`;
                    return StoreRepository.dao.run(sql, [key, value, createDate]);
                }                
            });
    }
}

module.exports = StoreRepository;