import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Home.module.css';
import { updateObject, checkValidity } from '../../shared/utility';
import * as actions from '../../store/actions/index';
import { Modal, Button, Form, FormControl } from 'react-bootstrap';

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
        this.props.onAuth(this.state.controls.cpf.value, this.state.controls.nome.value, this.state.controls.telefone.value, this.state.acao === 'cadastrar');
    }


    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });
        this.setState({ controls: updatedControls });
    }

    render() {
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

        if (this.state.acao !== null) {
            form = formElementsArray.map((formElement, idx) => (
                <Form.Group className="row" key={formElement.id}>
                    <div className="col-lg-12 col-md-12">
                        {/* <Form.Label>Nome</Form.Label> */}
                        <Form.Control
                            type={formElement.config.elementConfig.type}
                            // name="nome"
                            placeholder={formElement.config.elementConfig.placeholder}
                            value={formElement.config.value}
                            onChange={(event) => this.inputChangedHandler(event, formElement.id)}
                            // onBlur={this.inputBlurHandler}
                            // isInvalid={this.state.inputs.nome.touched && this.state.inputs.nome.invalid}
                            autoFocus={idx === 0}
                        />
                        <FormControl.Feedback type="invalid">
                            {/* {this.state.inputs.nome.error} */}
                        </FormControl.Feedback>
                    </div>
                </Form.Group>
            ));
        }

        const modalForm = (
            <Modal show backdrop='static'>
                <Modal.Header closeButton>
                    <Modal.Title style={{ color: '#471323' }}>Bem vindo ao Ekki</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={classes.Header}>
                        {/* <p>Entre ou Cadatre-se</p> */}
                        <Button
                            variant="outline-primary"
                            onClick={() => this.setState({ acao: 'cliente' })}
                            style={{ marginRight: '8px'}}>Já sou cliente</Button>
                        <Button
                            variant="outline-success"
                            onClick={() => this.setState({ acao: 'cadastrar' })}>Cadastrar</Button>
                    </div>
                    {
                        !form ? null : (
                            <Form noValidate onSubmit={this.submitHandler}>
                                <div className="row justify-content-center">
                                    <div className="col-md-10">
                                        <div>
                                            {form}
                                        </div>
                                    </div>
                                </div>
                                <div className={classes.FormFooter}>
                                    <Button 
                                        variant="outline-secondary" 
                                        size="sm" 
                                        type='submit'
                                        className="pull-right">OK</Button>
                                </div>
                                <div className={classes.FormError}>
                                    {
                                        this.props.error ? <p>{this.props.error}</p> : null
                                    }
                                </div>
                            </Form>
                        )
                    }
                </Modal.Body>
                <Modal.Footer>
                    <small>Seu login é efetuado pelo eu CPF</small>
                </Modal.Footer>
            </Modal>
        );

        let pageContent = (
            <div className="row">
                <div className="col-sm-12">
                    {modalForm}
                </div>
            </div>
        );

        return (
            <div>
                {pageContent}
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