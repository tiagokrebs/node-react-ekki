/**
 * Rotas da API para controle dos usuários
 * 
 * Cada rota referncia um serviço e retorna a resposta obtida
 * Os serviços são implementados em outro módulo para melhor
 * compreesão e escalabilidade do fonte
 */

const express = require('express');
const userService = require('../../services/users/user');

let router = express.Router();

router.get('/', userService.getUsers);
router.get('/:id', userService.getUserById);
router.post('/', userService.createUser);
router.put('/:id', userService.updateUser);
router.delete('/:id', userService.deleteUser);

module.exports = router;