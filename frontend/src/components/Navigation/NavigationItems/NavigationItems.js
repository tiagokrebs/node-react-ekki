import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Conta</NavigationItem>
        <NavigationItem link="/favorecidos" exact>Favorecidos</NavigationItem>
        <NavigationItem link="/transacoes">Transações</NavigationItem>
        <NavigationItem link="/perfil">Meu Perfil</NavigationItem>
        <NavigationItem link="/logout">Sair</NavigationItem>
    </ul>
);

export default navigationItems;