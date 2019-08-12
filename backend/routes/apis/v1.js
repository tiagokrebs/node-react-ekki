const userController = require('../../controllers/apis/user');
const contaController = require('../../controllers/apis/conta');
const express = require('express');

let router = express.Router();
router.use('/users', userController);
router.use('/contas', contaController);

module.exports = router;