const server = require('./configs/app')();
const config = require('./configs/config/config');
const db = require('./configs/db');

// cria a configuracao basica do servidor
server.create(config, db);

// inicia servidor
server.start();