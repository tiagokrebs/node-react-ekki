/**
 * Operações com o banco de dados relativas a conta do usuário
 * 
 * O uso de Promisses foi empregado devido a característica assíncrona
 * das funções de sqlite3.Database
 * Exceções são lançadas para o chamador
 */

const sqlite3 = require('sqlite3').verbose();
const dbConfig = require('../configs/db');
const md5 = require('md5');

/**
 * Obtem lista de contas do sistema
 */
const find = () => {
    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database(dbConfig.database, sqlite3.OPEN_READWRITE, (erro) => {
            if (erro) {
                throw erro
            } else {
                
                let sql = 'SELECT * FROM contas;';

                db.all(sql, [], (erro, rows) => {
                    if (erro) {
                        reject(erro);
                    }
                    resolve(rows);
                });

                db.close();
            }
        });
    });
}

/**
 * Obtem conta de acordo com identificação
 * @param {number} id Um código de identificação da conta
 */
const findById = (id) => {
    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database(dbConfig.database, sqlite3.OPEN_READWRITE, (erro) => {
            if (erro) {
                throw erro
            } else {
                
                let sql = 'SELECT * FROM contas WHERE id = ?';

                db.all(sql, [id], (erro, rows) => {
                    if (erro) {
                        reject(erro);
                    }
                    resolve(rows);
                });

                db.close();
            }
        });
    });
}

/**
 * Inserção de uma nova conta no sistema
 * @param {object} data Um objeto com os dados da conta
 */
const create = (userId) => {
    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database(dbConfig.database, sqlite3.OPEN_READWRITE, (erro) => {
            if (erro) {
                throw erro
            } else {
                
                let sql = 'INSERT INTO contas (usuario_id, saldo, limite) VALUES (?,?,?)'

                db.run(sql, [userId, 1000, 500], (erro, rows) => {
                    if (erro) {
                        reject(erro);
                    }
                    resolve(rows);
                });

                db.close();
            }
        });
    });
}

module.exports = {
    find: find,
    findById: findById,
    create: create
}