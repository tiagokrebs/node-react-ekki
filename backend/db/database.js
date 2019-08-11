const sqlite3 = require('sqlite3').verbose();
const dbConfig = require('../configs/db');

// conecta ao banco de dados
let db = new sqlite3.Database(dbConfig.database, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        throw err
    }
});

module.exports = db