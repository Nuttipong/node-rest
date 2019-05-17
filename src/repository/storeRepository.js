export default class StoreRepository {
    constructor (dao) {
        this.dao = dao.theDb || null;
    }

    createTable() {
        var sql = `CREATE TABLE IF NOT EXISTS tbl_store (
            key TEXT PRIMARY KEY,
            value BLOB,
            createDate INTEGER,
            modifyDate INTEGER
        )`;
        return new Promise((resolve, reject) => {
            this.dao.run(sql, (err) => {
                if (!err) {
                    console.log('Error running sql', sql);
                    console.log(err);
                    reject(err);
                } else {
                    resolve('success');
                }
            });
        })
        .catch((err) => {
            throw err;
        });
    };

    getByKey(key) {
        var sql = `SELECT * FROM tbl_store WHERE key = ?`;
        return new Promise((resolve, reject) => {
            this.dao.get(sql, [key], (err, result) => {
                if (err) {
                    console.log('Error running sql', sql);
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
        return new Promise((resolve, reject) => {
            this.getByKey(key)
                .then((hasKey) => {

                    const next = (sql, err) => {
                        if (err) {
                            console.log('Error running sql', sql);
                            console.log(err);
                            reject(err);
                        } else {
                            resolve('success');
                        }
                    };

                    if (hasKey) {
                        const modifyDate = timestamp;
                        sql = `UPDATE tbl_store SET value = (?), modifyDate =(?) WHERE key = (?);`;
                        this.dao.run(sql, [value, modifyDate, key], (err) => next(sql, err));
                    } else {
                        const createDate = timestamp;
                        sql = `INSERT INTO tbl_store (key, value, createDate) VALUES (?, ?, ?);`;
                        this.dao.run(sql, [key, value, createDate], (err) => next(sql, err));
                    }                
                });
        })
        .catch((err) => {
            throw err;
        });
    }
}
