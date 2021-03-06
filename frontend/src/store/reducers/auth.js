import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    nome: null,
    cpf: null,
    telefone: null,
    token: null,
    error: null,
    loading: false
};

const authStart = (state, action) => {
    return updateObject(state, {
        error: null, 
        loading: true
    });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        cpf: action.cpf,
        nome: action.nome,
        telefone: action.telefone,
        error: null, 
        loading: false, 
    });
};

const authFailed = (state, action) => {
    return updateObject(state, {
        error: action.error, 
        loading: false, 
    });
};

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        cpf: null,
        nome: null,
        telefone: null,
        error: null,
        loading: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAILED: return authFailed(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        default: return state;
    }
};

export default reducer;