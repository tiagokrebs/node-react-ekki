import axios from '../../shared/axios-contas';

import * as actionTypes from './actionsTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (data) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: data.token,
        cpf: data.cpf,
        nome: data.nome,
        telefone: data.telefone
    };
};

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    };
};

export const auth = (cpf, nome, telefone, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        let authData, url;
        if (isSignup) {
            authData = {
                cpf: cpf,
                nome: nome,
                telefone: telefone
            };

            axios.post('/users', authData)
            .then(response => {
                localStorage.setItem('token', response.data.data.token);
                dispatch(authSuccess(response.data.data));
            })
            .catch(error => {
                dispatch(authFailed(error.response.data.description));
            });  

        } else {
            axios.get('/users', { 
                params: {
                    cpf: cpf
                }
            })
            .then(response => {
                localStorage.setItem('token', response.data.data.token);
                dispatch(authSuccess(response.data.data));
            })
            .catch(error => {
                dispatch(authFailed(error.response.data.description));
            });

        }
    };
};