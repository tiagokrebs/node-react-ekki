/**
 * Serviços para controle das contas dos usuários
 * 
 * Funções assíncronas e Promisses são integradas
 * Objetos Responde obtidos de Router são retornados com o código HTTP,
 * dados e mensagem de acordo com cada resultado de operação
 */

const Conta = require('../../models/conta');

/**
 * Obtenção da lista de contas do sistema
 * @param {object} req O objeto com os dados da requisição
 * @param {object} res O Objeto com os dados da resposta para a requisição
 * @param {function} next A função para passagem do controle para a próxima middleware
 */
const getContas = async (req, res, next) => {

    const userId = req.query.user;

    try {
        if (userId !== undefined) {
            Conta.findByUserId(userId)
            .then(contas => {
                if (contas.length > 0) {
                    return res.status(200).json({
                        'message': 'contas obtidas com sucesso',
                        'data': contas
                    });
                }

                return res.status(404).json({
                    'code': 'BAD_REQUEST_ERROR',
                    'description': 'nenhuma conta encontrada'
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
            Conta.find()
            .then(contas => {
                if (contas.length > 0) {
                    return res.status(200).json({
                        'message': 'contas obtidas com sucesso',
                        'data': contas
                    });
                }

                return res.status(404).json({
                    'code': 'BAD_REQUEST_ERROR',
                    'description': 'nenhuma conta encontrada'
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
 * Obtenção dos dados de uma conta do sistema
 * @param {object} req O objeto com os dados da requisição
 * @param {object} res O Objeto com os dados da resposta para a requisição
 * @param {function} next A função para passagem do controle para a próxima middleware
 */
const getContaById = async (req, res, next) => {
    try {
        Conta.findById(req.params.id)
            .then(conta => {
                if (conta.length > 0) {
                    return res.status(200).json({
                        'message': `conta id ${req.params.id} obtida com sucesso`,
                        'data': conta
                    });
                }

                return res.status(404).json({
                    'code': 'BAD_REQUEST_ERROR',
                    'description': 'nenhuma conta encontrada'
                });
            })
            .catch(() => {
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
    getContas: getContas,
    getContaById: getContaById
}