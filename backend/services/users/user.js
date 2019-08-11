const User = require('../../models/user');

const getUsers = (req, res, next) => {
    try {
        User.find()
            .then(users => {
                console.log('users', users);
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
            .catch((error) => {
                console.log(error);
                return res.status(500).json({
                    'code': 'SERVER_ERROR',
                    'description': 'algo deu errado, tente novamente'
                });
            });

    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'algo deu errado, tente novamente'
        });
    }
}

const getUserById = async (req, res, next) => {
    try {
        let user = await User.findById(req.params.id);
        if (user) {
            return res.status(200).json({
                'message': `usuário id ${req.params.id} obtido com sucesso`,
                'data': user
            });
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'nenhum usuário encontrado'
        });

    } catch (error) {

        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'algo deu errado, tente novamente'
        });
    }
}

const createUser = async (req, res, next) => {
    try {

        const {
            name,
            email
        } = req.body;

        if (name === undefined || name === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'nome é obrigatório',
                'field': 'name'
            });
        }

        if (email === undefined || email === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'email é obrigatório',
                'field': 'email'
            });
        }


        let isEmailExists = await User.findOne({
            "email": email
        });

        if (isEmailExists) {
            return res.status(409).json({
                'code': 'ENTITY_ALREAY_EXISTS',
                'description': 'email já existe',
                'field': 'email'
            });
        }

        const temp = {
            name: name,
            email: email
        }

        let newUser = await User.create(temp);

        if (newUser) {
            return res.status(201).json({
                'message': 'usuário criado com sucesso',
                'data': newUser
            });
        } else {
            throw new Error('algo deu errado');
        }
    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'algo deu errado, tente novamente'
        });
    }
}

const updateUser = async (req, res, next) => {
    try {


        const userId = req.params.id;

        const {
            name,
            email
        } = req.body;

        if (name === undefined || name === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'nome é obrigatório',
                'field': 'name'
            });
        }

        if (email === undefined || email === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'email é obrigatório',
                'field': 'email'
            });
        }


        let isUserExists = await User.findById(userId);

        if (!isUserExists) {
            return res.status(404).json({
                'code': 'BAD_REQUEST_ERROR',
                'description': 'usuário não encontrado no sistema'
            });
        }

        const temp = {
            name: name,
            email: email
        }

        let updateUser = await User.findByIdAndUpdate(userId, temp, {
            new: true
        });

        if (updateUser) {
            return res.status(200).json({
                'message': 'usuário atualizado com sucesso',
                'data': updateUser
            });
        } else {
            throw new Error('algo deu errado');
        }
    } catch (error) {

        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'algo deu errado, tente novamente'
        });
    }
}

const deleteUser = async (req, res, next) => {
    try {
        let user = await User.findByIdAndRemove(req.params.id);
        if (user) {
            return res.status(204).json({
                'message': `usuário id ${req.params.id} deletado com sucesso`
            });
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'usuário não encontrado no sistema'
        });

    } catch (error) {

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
    deleteUser: deleteUser
}