import React, { Component } from 'react';

/**
 * HOC para carregar chunks dos compoententes de forma assíncrona, 
 * apenas quando houver necessidade de rendererização
 * importComponent() retorna uma Promisse com o componente e atributos
 * caso importação tenha ocorrido com sucesso
 * @param {function} importComponent 
 */
const asyncComponent = (importComponent) => {
    return class extends Component {
        state = {
            component: null
        }
        
        // caso a importação seja bem sucedida o compoente é definido
        componentDidMount () {
            importComponent()
                .then(cmp => {
                    this.setState({component: cmp.default});
                });
        }

        render () {
            const C = this.state.component;

            // caso componente definido em state renderiza com props do pai
            return C ? <C {...this.props}/> : null;
        }
    }
}

export default asyncComponent;