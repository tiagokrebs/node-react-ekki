const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const md5 = require('md5');

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

        // conecta ao banco de dados
        let db = new sqlite3.Database(dbConfig.database, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log('Conectado ao banco de dados ' + dbConfig.database);

                // todo: adicionar tabelas e iserts default em outra pasta e apenas executar aqui
                db.run(`CREATE TABLE usuarios (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nome text, 
                    cpf text UNIQUE, 
                    telefone text,
                    senha text,
                    CONSTRAINT cpf_unique UNIQUE (cpf)
                    )`,
                    (err) => {
                        if (err) {
                            // tabela já existe
                        } else {
                            // adiciona alguns usuários para teste
                            var insert = 'INSERT INTO usuarios (nome, cpf, telefone, senha) VALUES (?,?,?,?)'
                            db.run(insert, ["Tiago Krebs", "01492877042", "51999766783", md5("01492877042")])
                            db.run(insert, ["Ana Giulia Kist", "44444444444", "51981891919", md5("44444444444")])

                            // adiciona as contas para os usuários teste

                            // adiciona algumas transferencias exemplo

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