const userController = require('../../controllers/apis/user');
const contaController = require('../../controllers/apis/conta');
const favorecidoController = require('../../controllers/apis/favorecido');
const express = require('express');

let router = express.Router();
router.use('/users', userController);
router.use('/contas', contaController);
router.use('/favorecidos', favorecidoController)

module.exports = router;