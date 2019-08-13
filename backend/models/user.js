/**
 * Operações com o banco de dados relativas ao usuário
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
 * Obtem lista de usuários do sistema
 */
const find = () => {
    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database(dbConfig.database, sqlite3.OPEN_READWRITE, (erro) => {
            if (erro) {
                throw erro
            } else {
                
                let sql = 'SELECT * FROM usuarios;';

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
 * Obtem usuário de acordo com identificação
 * @param {number} id Um código de identificação do usuário
 */
const findById = (id) => {
    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database(dbConfig.database, sqlite3.OPEN_READWRITE, (erro) => {
            if (erro) {
                throw erro
            } else {
                
                let sql = 'SELECT * FROM usuarios WHERE id = ?';

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
 * Verifica existência de um usuário através do CPF
 * @param {string} cpf O documento de identificação do usário
 */
const cpfExists = (cpf) => {
    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database(dbConfig.database, sqlite3.OPEN_READWRITE, (erro) => {
            if (erro) {
                throw erro
            } else {
                
                let sql = 'SELECT * FROM usuarios WHERE cpf = ?';

                db.all(sql, [cpf], (erro, rows) => {
                    if (erro) {
                        reject(erro);
                    }
                    resolve(rows.length > 0);
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
                
                let sql = 'INSERT INTO usuarios (nome, cpf, telefone, senha) VALUES (?,?,?,?)'

                db.run(sql, [data.nome, data.cpf, data.telefone, md5(data.cpf)], (erro, rows) => {
                    if (erro) {
                        reject(erro);
                    }

                    let sql = 'SELECT * FROM usuarios WHERE cpf = ? LIMIT 1';

                    db.all(sql, [data.cpf], (erro, rows) => {
                        if (erro) {
                            reject(erro);
                        }

                        Conta.create(rows[0].id)
                            .then(() => resolve(rows))
                            .catch((erro) => reject(erro));
                    });
                });

                db.close();

            }
        });
    });
}

/**
 * Atualização dos dados de um usuário já existente
 * @param {number} userId O código de identificação do usuário
 * @param {object} data Um objeto com os dados do usuário
 */
const findByIdAndUpdate = (userId, data) => {
    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database(dbConfig.database, sqlite3.OPEN_READWRITE, (erro) => {
            if (erro) {
                throw erro
            } else {
                
                let sql = 'UPDATE usuarios SET nome=?, cpf=?, telefone=? WHERE id=?'

                db.run(sql, [data.nome, data.cpf, data.telefone, userId], (erro, rows) => {
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
 * Remove usuário do sistema
 * @param {number} userId O código de identificação do usuário
 */
const findByIdAndRemove = (userId) => {
    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database(dbConfig.database, sqlite3.OPEN_READWRITE, (erro) => {
            if (erro) {
                throw erro
            } else {
                
                let sql = 'DELETE FROM usuarios WHERE id=?'

                db.run(sql, [userId], (erro, rows) => {
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

module.exports = {
    find: find,
    findById: findById,
    cpfExists: cpfExists,
    create: create,
    findByIdAndUpdate: findByIdAndUpdate,
    findByIdAndRemove: findByIdAndRemove
}