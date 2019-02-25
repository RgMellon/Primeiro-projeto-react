import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export default class InputCustomizado extends Component {
    constructor() {
        super();
         
        this.state = {
            erro: ''
        }


    }
    render() {
        return(
            <div className="pure-control-group">
               <label htmlFor={this.props.id}> {this.props.name} </label> 
                <input id={this.props.id} 
                type={this.props.type} name={this.props.name}
                value={this.props.value} onChange={this.props.onChange} />
                <div className="erro"> <span> {this.state.erro} </span> </div>                 
            </div>
        )
    }

    componentDidMount() {
        PubSub.subscribe('mostra-erro', function(topico, erro) {
        if(erro.field == this.props.name) {
            this.setState({erro: erro.defaultMessage});
        }}.bind(this));

        PubSub.subscribe("limpa-erros",function(topico){
            this.setState({erro:''});
        }.bind(this));
    }

}