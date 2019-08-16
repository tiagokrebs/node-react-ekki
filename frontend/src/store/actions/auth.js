import axios from 'axios';

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
            url = '';
        } else {
            authData = {
                cpf: cpf
            };
            url = '';
        }
        
        axios.post(url, authData)
            .then(response => {
                localStorage.setItem('token', response.data.token);
                dispatch(authSuccess(response.data));
            })
            .catch(err => {
                dispatch(authFailed(err.response.data.error));
            });   
    };
};