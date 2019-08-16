import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import asyncComponent from './hoc/asyncComponent/asyncComponent';

import * as actions from './store/actions/index';
import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home';
import Conta from './containers/Conta/Conta';
import Favorecidos from './containers/Favorecidos/Favorecidos';
import Transacoes from './containers/Transacoes/Transacoes';
import Perfil from './containers/Perfil/Perfil';

class App extends Component {
  componentDidMount() {
    // ações na primeira renderização do app
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact component={Conta} />
          <Route path="/favorecidos" exact component={Favorecidos} />
          <Route path="/transacoes" exact component={Transacoes} />
          <Route path="/perfil" exact component={Perfil} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <div>
        <Layout isAuthenticated={this.props.isAuthenticated}>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // todo: método simples para verificar token de usuário local
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));