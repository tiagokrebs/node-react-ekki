import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

/**
 * HOC com estrutura principal do App
 * Renderiza componentes fixos no layout como Toolbar e SideDrawer,
 * sempre visíveis, e componentes dinâmicos recebidos como filhos
 */
class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    }

    render () {
        let layout = (
            <Aux>
                <main className={classes.ContentHome}>
                    {this.props.children}
                </main>
            </Aux>
        )

        if (this.props.isAuthenticated) {
            layout = (
                <Aux>
                    <Toolbar 
                        isAuth={this.props.isAuthenticated}
                        drawerToggleClicked={this.sideDrawerToggleHandler} />
                    <SideDrawer
                        isAuth={this.props.isAuthenticated}
                        open={this.state.showSideDrawer}
                        closed={this.sideDrawerClosedHandler} />
                    <main className={classes.Content}>
                        {this.props.children}
                    </main>
                </Aux>
            )
        }

        return layout
    }
}

export default Layout;