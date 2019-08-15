import React from 'react';

import ekkilogo from '../../assets/images/ekki-logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={ekkilogo} alt="Ekki" />
    </div>
);

export default logo;