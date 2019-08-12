const apiRoute = require('./apis');

const init = (server) => {
    server.get('*', function (req, res, next) {
        console.log('Requisição: ' + req.method + ' ' + req.originalUrl);
        return next();
    });

    server.use('/api', apiRoute);
}

module.exports = {
    init: init
};