const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const md5 = require('md5');
const moment = require('moment-timezone');

module.exports = function () {
    let server = express(),
        create,
        start;

    create = (config, dbConfig) => {
        let routes = require('../routes');

        // seta propriedades do servidor
        server.set('env', config.env);
        server.set('port', config.port);
        server.set('hostname', config.hostname);

        // adiciona middleware para fazer parse de json
        server.use(bodyParser.json());
        server.use(bodyParser.urlencoded({
            extended: false
        }))

        // cria estrutura do banco de dados
        // todo: transferir para ./db
        let db = new sqlite3.Database(dbConfig.database, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log('Conectado ao banco de dados ' + dbConfig.database);

                db.run(`CREATE TABLE usuarios (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nome TEXT, 
                    cpf TEXT UNIQUE, 
                    telefone TEXT,
                    token TEXT,
                    CONSTRAINT cpf_unique UNIQUE (cpf)
                    )`,
                    (err) => {
                        if (err) {
                            // tabela já existe
                        } else {
                            // adiciona alguns usuários para teste
                            var insert = 'INSERT INTO usuarios (id, nome, cpf, telefone, token) VALUES (?,?,?,?,?)'
                            db.run(insert, [1, "Tiago Krebs", "01492877042", "51999766783", md5("01492877042")])
                            db.run(insert, [2, "Ana Giulia Kist", "44444444444", "51981891919", md5("44444444444")])
                        }
                    });
                db.run(`CREATE TABLE contas (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    usuario_id INTEGER,
                    saldo REAL,
                    limite REAL,
                        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
                    )`, (err) => {
                        if (err) {
                            // tabela já existe
                        } else {
                            var insert = 'INSERT INTO contas (id, usuario_id, saldo, limite) VALUES (?,?,?,?)'
                            db.run(insert, [1, 1, 1000, 500])
                            db.run(insert, [2, 2, 1000, 500])
                        }
                    });
                db.run(`CREATE TABLE favorecidos (
                    usuario_id INTEGER,
                    conta_id INTEGER,
                        FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
                        FOREIGN KEY (conta_id) REFERENCES contas(id)
                    )`, (err) => {
                        if (err) {
                            // tabela já existe
                        } else {
                            var insert = 'INSERT INTO favorecidos (usuario_id, conta_id) VALUES (?,?)'
                            db.run(insert, [1, 2])
                            db.run(insert, [2, 1])
                        }
                    });
                db.run(`CREATE TABLE transacoes (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    conta_id INTEGER,
                    efetivada TEXT,
                    valor REAL,
                    descricao TEXT,
                        FOREIGN KEY (conta_id) REFERENCES contas(id)
                    )`, (err) => {
                        if (err) {
                            // tabela já existe
                        } else {
                            var insert = 'INSERT INTO transacoes (conta_id, efetivada, valor, descricao) VALUES (?,?,?,?)'
                            db.run(insert, [1, moment.tz(new Date(), "America/Sao_Paulo").format(), 1000, "Crédito de adesão"])
                            db.run(insert, [2, moment.tz(new Date(), "America/Sao_Paulo").format(), 1000, "Crédito de adesão"])
                        }
                    });
                db.close();
            }
        });

        // seta as rotas
        routes.init(server);
    };

    start = () => {
        let hostname = server.get('hostname'),
            port = server.get('port');
        server.listen(port, function () {
            console.log('Servidor Express escutando em http://' + hostname + ':' + port);
        });
    };

    return {
        create: create,
        start: start
    }
}