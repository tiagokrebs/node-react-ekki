import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';
// import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from './hoc/Layout/Layout';
import Conta from './containers/Conta/Conta';

class App extends Component {
  componentDidMount() {
    // ações na primeira renderização do app
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={Conta} />
        <Redirect to="/" />
      </Switch>
    );

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

export default withRouter(App);
