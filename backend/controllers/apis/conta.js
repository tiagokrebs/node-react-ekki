/**
 * Rotas da API para as contas
 * 
 * Cada rota referencia um serviço e retorna a resposta obtida
 * Os serviços são implementados em outro módulo para melhor
 * compreesão e escalabilidade do fonte
 */

const express = require('express');
const contaService = require('../../services/contas/conta');

let router = express.Router();

router.get('/', contaService.getContas);
router.get('/:id', contaService.getContaById);

module.exports = router;