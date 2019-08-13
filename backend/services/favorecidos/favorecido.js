/**
 * Serviços para controle dos favorecidos dos usuários
 * 
 * Funções assíncronas e Promisses são integradas
 * Objetos Responde obtidos de Router são retornados com o código HTTP,
 * dados e mensagem de acordo com cada resultado de operação
 */

const Favorecido = require('../../models/favorecido');
const User = require('../../models/user');
const Conta = require('../../models/conta');

/**
 * Obtenção da lista de favorecidos do sistema
 * @param {object} req O objeto com os dados da requisição
 * @param {object} res O Objeto com os dados da resposta para a requisição
 * @param {function} next A função para passagem do controle para a próxima middleware
 */
const getFavorecidos = async (req, res, next) => {

    const userId = req.query.user;

    try {
        if (userId !== undefined) {
            Favorecido.findByUserId(userId)
            .then(favorecidos => {
                if (favorecidos.length > 0) {
                    return res.status(200).json({
                        'message': 'favorecidos obtidos com sucesso',
                        'data': favorecidos
                    });
                }

                return res.status(404).json({
                    'code': 'BAD_REQUEST_ERROR',
                    'description': 'nenhum favorecido encontrada'
                });
            })
            .catch((erro) => {
                console.log(erro);
                return res.status(500).json({
                    'code': 'SERVER_ERROR',
                    'description': 'algo deu errado, tente novamente'
                });
            });
        } else {
            Favorecido.find()
            .then(favorecidos => {
                if (favorecidos.length > 0) {
                    return res.status(200).json({
                        'message': 'favorecidos obtidos com sucesso',
                        'data': favorecidos
                    });
                }

                return res.status(404).json({
                    'code': 'BAD_REQUEST_ERROR',
                    'description': 'nenhuma favorecido encontrado'
                });
            })
            .catch((erro) => {
                console.log(erro);
                return res.status(500).json({
                    'code': 'SERVER_ERROR',
                    'description': 'algo deu errado, tente novamente'
                });
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'algo deu errado, tente novamente'
        });
    }
}

/**
 * Criação de um novo usuário no sistema
 * @param {object} req O objeto com os dados da requisição
 * @param {object} res O Objeto com os dados da resposta para a requisição
 * @param {function} next A função para passagem do controle para a próxima middleware
 */
const createFavorecido = async (req, res, next) => {
    try {

        const {
            usuario_id,
            conta_id
        } = req.body;

        if (usuario_id === undefined || usuario_id === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'usuario_id é obrigatório',
                'field': 'usuario_id'
            });
        }

        if (conta_id === undefined || conta_id === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'conta_id é obrigatório',
                'field': 'conta_id'
            });
        }

        User.findById(usuario_id)
            .then((user) => {
                if (!user.length > 0) {
                    return res.status(404).json({
                        'code': 'BAD_REQUEST_ERROR',
                        'description': 'usuário não encontrado no sistema'
                    });
                } else {
                    Conta.findById(conta_id)
                        .then((conta) => {
                            if (!conta.length > 0) {
                                return res.status(404).json({
                                    'code': 'BAD_REQUEST_ERROR',
                                    'description': 'conta não encontrada no sistema'
                                });
                            } else {
                                const temp = {
                                    usuario_id: usuario_id,
                                    conta_id: conta_id
                                }
            
                                Favorecido.create(temp)
                                    .then((newFavorecido) => {
                                        return res.status(201).json({
                                            'message': 'favorecido criado com sucesso',
                                            'data': newFavorecido
                                        });
                                    })
                                    .catch((erro) => {
                                        console.log(erro);
                                        return res.status(500).json({
                                            'code': 'SERVER_ERROR',
                                            'description': 'algo deu errado, tente novamente'
                                        });
                                    });
                            }
                        })
                }
            });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'algo deu errado, tente novamente'
        });
    }
}

/**
 * Remoção do usuário do sistema
 * @param {object} req O objeto com os dados da requisição
 * @param {object} res O Objeto com os dados da resposta para a requisição
 * @param {function} next A função para passagem do controle para a próxima middleware
 */
const deleteFavorecido = async (req, res, next) => {
    try {

        const userId = req.params.usuarioId;
        const contaId = req.params.contaId;

        Favorecido.findByIdAndRemove(userId, contaId)
            .then(() => {
                return res.status(200).json({
                    'message': `favorecido removido com sucesso`
                });
            })
            .catch((erro) => {
                console.log(erro);
                return res.status(500).json({
                    'code': 'SERVER_ERROR',
                    'description': 'algo deu errado, tente novamente'
                });
            });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'algo deu errado, tente novamente'
        });
    }
}

module.exports = {
    getFavorecidos: getFavorecidos,
    createFavorecido: createFavorecido,
    deleteFavorecido: deleteFavorecido
}