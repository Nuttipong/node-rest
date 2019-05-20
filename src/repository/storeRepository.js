export const QUERY_CREATE_TABLE_TBL_STORE = `CREATE TABLE IF NOT EXISTS tbl_store (
    key TEXT PRIMARY KEY,
    value BLOB,
    createDate INTEGER,
    modifyDate INTEGER
)`;

export const QUERY_SELECT_TBL_STORE_BY_KEY = `SELECT * FROM tbl_store WHERE key = ?`;
export const QUERY_UPDATE_TBL_STORE_BY_KEY = `UPDATE tbl_store SET value = (?), modifyDate =(?) WHERE key = (?);`;
export const QUERY_INSERT_TBL_STORE_BY_KEY = `INSERT INTO tbl_store (key, value, createDate, modifyDate) VALUES (?, ?, ?, ?);`;

export default class StoreRepository {
    constructor (dao) {
        this.dao = dao.theDb || null;
    }

    createTable() {
        const sql = QUERY_CREATE_TABLE_TBL_STORE;
        return new Promise((resolve, reject) => {
            this.dao.run(sql, (err) => {
                if (err) {
                    console.log('Error running sql', sql);
                    console.log(err);
                    reject(err);
                }
            });
            resolve('success');
        });
    };

    getByKey(key) {
        var sql = QUERY_SELECT_TBL_STORE_BY_KEY;
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
                        sql = QUERY_UPDATE_TBL_STORE_BY_KEY;
                        this.dao.run(sql, [value, modifyDate, key], (err) => next(sql, err));
                    } else {
                        sql = QUERY_INSERT_TBL_STORE_BY_KEY;
                        this.dao.run(sql, [key, value, timestamp, timestamp], (err) => next(sql, err));
                    }                
                });
        })
    }
}
