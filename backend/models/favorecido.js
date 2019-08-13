/**
 * Operações com o banco de dados relativas aos favorecidos
 * 
 * O uso de Promisses foi empregado devido a característica assíncrona
 * das funções de sqlite3.Database
 * Exceções são lançadas para o chamador
 * Apesar de não necessários todos os métodos para CRUD foram implementados
 */

const sqlite3 = require('sqlite3').verbose();
const dbConfig = require('../configs/db');
const md5 = require('md5');
const Conta = require('../models/conta');

/**
 * Obtem lista de favorecidos do sistema
 */
const find = () => {
    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database(dbConfig.database, sqlite3.OPEN_READWRITE, (erro) => {
            if (erro) {
                throw erro
            } else {
                
                let sql = 'SELECT * FROM favorecidos;';

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
 * Inserção de um novo usuário do sistema
 * @param {object} data Um objeto com os dados do usuário
 */
const create = (data) => {
    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database(dbConfig.database, sqlite3.OPEN_READWRITE, (erro) => {
            if (erro) {
                throw erro
            } else {
                
                let sql = 'INSERT INTO favorecidos (usuario_id, conta_id) VALUES (?,?)'

                db.run(sql, [data.usuario_id, data.conta_id], (erro, rows) => {
                    if (erro) {
                        reject(erro);
                    }

                    let sql = 'SELECT * FROM favorecidos WHERE usuario_id = ? AND conta_id = ? LIMIT 1';

                    db.all(sql, [data.usuario_id, data.conta_id], (erro, rows) => {
                        if (erro) {
                            reject(erro);
                        }

                        resolve(rows);
                    });
                });

                db.close();

            }
        });
    });
}

/**
 * Remove usuário do sistema
 * @param {number} userId O código de identificação do usuário
 */
const findByIdAndRemove = (userId, contaId) => {
    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database(dbConfig.database, sqlite3.OPEN_READWRITE, (erro) => {
            if (erro) {
                throw erro
            } else {
                console.log(userId, contaId);
                let sql = 'DELETE FROM favorecidos WHERE usuario_id = ? AND conta_id = ?'

                db.run(sql, [userId, contaId], (erro, rows) => {
                    if (erro) {
                        reject(erro);
                    }
                    resolve();
                });

                db.close();
            }
        });
    });
}

/**
 * Obtem favorecidos de acordo com identificação do usuário
 * @param {number} id Um código de identificação do usuário
 */
const findByUserId = (id) => {
    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database(dbConfig.database, sqlite3.OPEN_READWRITE, (erro) => {
            if (erro) {
                throw erro
            } else {
                
                let sql = 'SELECT * FROM favorecidos WHERE usuario_id = ?';

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

module.exports = {
    find: find,
    create: create,
    findByIdAndRemove: findByIdAndRemove,
    findByUserId: findByUserId
}