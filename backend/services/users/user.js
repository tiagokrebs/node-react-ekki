/**
 * Serviços para controle dos usuários do sistema
 * 
 * Funções assíncronas e Promisses são integradas
 * Objetos Responde obtidos de Router são retornados com o código HTTP,
 * dados e mensagem de acordo com cada resultado de operação
 */

const User = require('../../models/user');
const Conta = require('../../models/conta');

/**
 * Obtenção da lista de usuários cadastrados no sistema
 * @param {object} req O objeto com os dados da requisição
 * @param {object} res O Objeto com os dados da resposta para a requisição
 * @param {function} next A função para passagem do controle para a próxima middleware
 */
const getUsers = async (req, res, next) => {
    try {
        User.find()
            .then(users => {
                if (users.length > 0) {
                    return res.status(200).json({
                        'message': 'usuários obtidos com sucesso',
                        'data': users
                    });
                }

                return res.status(404).json({
                    'code': 'BAD_REQUEST_ERROR',
                    'description': 'nenhum usuário encontrado'
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

/**
 * Obtenção dos dados de um usuário cadastrado no sistema
 * @param {object} req O objeto com os dados da requisição
 * @param {object} res O Objeto com os dados da resposta para a requisição
 * @param {function} next A função para passagem do controle para a próxima middleware
 */
const getUserById = async (req, res, next) => {
    try {
        User.findById(req.params.id)
            .then(user => {
                if (user.length > 0) {
                    return res.status(200).json({
                        'message': `usuário id ${req.params.id} obtido com sucesso`,
                        'data': user
                    });
                }

                return res.status(404).json({
                    'code': 'BAD_REQUEST_ERROR',
                    'description': 'nenhum usuário encontrado'
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

/**
 * Criação de um novo usuário no sistema
 * @param {object} req O objeto com os dados da requisição
 * @param {object} res O Objeto com os dados da resposta para a requisição
 * @param {function} next A função para passagem do controle para a próxima middleware
 */
const createUser = async (req, res, next) => {
    try {

        const {
            nome,
            cpf,
            telefone
        } = req.body;

        if (nome === undefined || nome === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'nome é obrigatório',
                'field': 'nome'
            });
        }

        if (cpf === undefined || cpf === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'cpf é obrigatório',
                'field': 'cpf'
            });
        }

        if (telefone === undefined || telefone === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'telefone é obrigatório',
                'field': 'telefone'
            });
        }

        User.cpfExists(cpf)
            .then((cpfExists) => {
                if (cpfExists) {
                    return res.status(409).json({
                        'code': 'ENTITY_ALREAY_EXISTS',
                        'description': 'cpf já existe',
                        'field': 'cpf'
                    });
                } else {
                    const temp = {
                        nome: nome,
                        cpf: cpf,
                        telefone: telefone
                    }

                    User.create(temp)
                        .then((newUser) => {
                            return res.status(201).json({
                                'message': 'usuário criado com sucesso',
                                'data': newUser
                            });
                        })
                        .catch(() => {
                            console.log(erro);
                            return res.status(500).json({
                                'code': 'SERVER_ERROR',
                                'description': 'algo deu errado, tente novamente'
                            });
                        });
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
 * Atualização dos dados de um usuário existente no sistema
 * @param {object} req O objeto com os dados da requisição
 * @param {object} res O Objeto com os dados da resposta para a requisição
 * @param {function} next A função para passagem do controle para a próxima middleware
 */
const updateUser = async (req, res, next) => {
    try {

        const userId = req.params.id;

        const {
            nome,
            cpf,
            telefone
        } = req.body;

        if (nome === undefined || nome === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'nome é obrigatório',
                'field': 'nome'
            });
        }

        if (cpf === undefined || cpf === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'cpf é obrigatório',
                'field': 'cpf'
            });
        }

        if (telefone === undefined || telefone === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'telefone é obrigatório',
                'field': 'telefone'
            });
        }

        User.findById(userId)
            .then(user => {
                if (!user.length > 0) {
                    return res.status(404).json({
                        'code': 'BAD_REQUEST_ERROR',
                        'description': 'usuário não encontrado no sistema'
                    });
                } else {
                    const temp = {
                        nome: nome,
                        cpf: cpf,
                        telefone: telefone
                    }

                    User.findByIdAndUpdate(userId, temp)
                    .then((updateUser) => {
                        return res.status(200).json({
                            'message': `usuário id ${userId} atualizado com sucesso`,
                            'data': updateUser
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
const deleteUser = async (req, res, next) => {
    try {

        const userId = req.params.id;

        User.findById(userId)
            .then(user => {
                if (!user.length > 0) {
                    return res.status(404).json({
                        'code': 'BAD_REQUEST_ERROR',
                        'description': 'usuário não encontrado no sistema'
                    });
                } else {
                    User.findByIdAndRemove(userId)
                    .then(() => {
                        return res.status(200).json({
                            'message': `usuário id ${userId} removido com sucesso`
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
 * Obtenção das contas de um usuário cadastrado no sistema
 * @param {object} req O objeto com os dados da requisição
 * @param {object} res O Objeto com os dados da resposta para a requisição
 * @param {function} next A função para passagem do controle para a próxima middleware
 */
const getContasByUserId = async (req, res, next) => {
    try {
        Conta.findByUserId(req.params.id)
            .then(contas => {
                if (contas.length > 0) {
                    return res.status(200).json({
                        'message': `contas obtida com sucesso`,
                        'data': contas
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
    getUsers: getUsers,
    getUserById: getUserById,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    getContasByUserId: getContasByUserId
}