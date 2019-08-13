/**
 * Rotas da API para controle dos favorecidos
 * 
 * Cada rota referencia um serviço e retorna a resposta obtida
 * Os serviços são implementados em outro módulo para melhor
 * compreesão e escalabilidade do fonte
 */

const express = require('express');
const favorecidoService = require('../../services/favorecidos/favorecido');

let router = express.Router();

router.get('/', favorecidoService.getFavorecidos);
router.post('/', favorecidoService.createFavorecido);
router.delete('/:usuarioId/:contaId', favorecidoService.deleteFavorecido);

module.exports = router;