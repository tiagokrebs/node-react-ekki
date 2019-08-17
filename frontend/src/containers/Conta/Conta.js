import React, { Component } from 'react';
import { connect } from 'react-redux';

// import classes from './Conta.module.css';

class Conta extends Component {
    render () {
        return (
            <p>Olá {this.props.nome}, bem vindo a sua conta!</p>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        nome: state.auth.nome.split(" ")[0],
    };
};

const mapDispatchToProps = dispatch => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Conta);