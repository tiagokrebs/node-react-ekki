const sqlite3 = require('sqlite3').verbose();
const dbConfig = require('../configs/db');

const find = () => {
    return new Promise(resolve => {
        let db = new sqlite3.Database(dbConfig.database, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                throw err
            } else {
                
                let sql = 'SELECT * from usuarios';

                db.all(sql, [], (err, rows) => {
                    if (err) {
                        throw err;
                    }
                    resolve(rows);
                });

                db.close();
            }
        });
    });
}

module.exports = {
    find: find
}