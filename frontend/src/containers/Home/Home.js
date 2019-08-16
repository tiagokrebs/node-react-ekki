import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Home.module.css';
import { updateObject, checkValidity } from '../../shared/utility';
import * as actions from '../../store/actions/index';

class Home extends Component {
    state = {
        acao: null,
        controls: {
            nome: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Seu Nome',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            cpf: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Seu CPF',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            telefone: {
                elementConfig: {
                    type: 'text',
                    placeholder: 'Seu Telefone',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            }
        },
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }


    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });
        this.setState({controls: updatedControls});
    }

    render () {
        let form = null;
        let formElementsArray = [];

        if (this.state.acao === 'cliente') {
            formElementsArray = [];
            for (let key in this.state.controls) {
                if (key === 'cpf') {
                    formElementsArray.push({
                        id: key,
                        config: this.state.controls[key]
                    });
                }
            }
        } else if (this.state.acao === 'cadastrar') {
            formElementsArray = [];
            for (let key in this.state.controls) {
                formElementsArray.push({
                    id: key,
                    config: this.state.controls[key]
                });
            }
        }

        form = formElementsArray.map(formElement => (
            <input 
                key={formElement.id}
                type={formElement.config.elementConfig.type}
                placeholder={formElement.config.elementConfig.placeholder}
                value={formElement.config.value}
                onChange={(event) => this.inputChangedHandler(event, formElement.id)}
                />
        ));

        return (
            <div>
                <h1>Bem vindo ao Ekki</h1>
                <button onClick={() => this.setState({acao: 'cliente'})}>Já sou cliente</button>
                <button onClick={() => this.setState({acao: 'cadastrar'})}>Cadastrar</button>
                {
                    !form ? null : (
                        <form onSubmit={this.submitHandler}>
                            {form}
                            <button>OK</button>
                        </form>
                    )
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (cpf, nome, telefone, isSignup) => dispatch(actions.auth(cpf, nome, telefone, isSignup)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);