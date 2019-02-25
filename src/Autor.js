import React, { Component } from 'react';
import InputCustomizado from './Components/InputCustomizado';
import PubSub from 'pubsub-js';
import TratadorErros from '../src/helpers/TratadorErros';

class FormularioAutor extends Component {

    constructor() {
        super();
        this.state = {
            nome: '',
            email: '',
            senha: ''
        }

        this.setEmail = this.setEmail.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setSenha = this.setSenha.bind(this);
        this.enviaForm = this.enviaForm.bind(this);
    }

    enviaForm(evento) {
        evento.preventDefault();
        fetch('http://cdc-react.herokuapp.com/api/autores', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                nome: this.state.nome,
                email: this.state.email,
                senha: this.state.senha
            })
        }).then(res => res.json())
          .then(json => {
                if(json.status === 400) {
                    new TratadorErros().publicaErros(json) 
                    return
                }
                PubSub.publish('atualiza-lista-autores', json)
                this.state.nome = '';
                this.state.email = '';
               
                PubSub.publish("limpa-erros",{});
            })
        
    }


    setNome(evento) {
        this.setState({
            nome: evento.target.value
        })
    }

    setEmail(evento) {
        this.setState({
            email: evento.target.value
        })
    }

    setSenha(evento) {
        this.setState({
            senha: evento.target.value
        })
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="POST">
                
                <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} 
                onChange={this.setNome} label="Nome"/>
                
                <InputCustomizado id="email" type="text" name="email" value={this.state.email} 
                    onChange={this.setEmail} />
                    
                
                <InputCustomizado id="senha" type="password" name="senha" value={this.state.senha} 
                    onChange={this.setSenha} /> 
                
                    
                <div className="pure-control-group">                                  
                    <label></label> 
                    <button type="submit" className="pure-button pure-button-primary">Gravar</button>                                    
                </div>

                </form>             
            </div> 
        )
    }
}

class TabelaAutor extends Component {
    
    render() {
        return(
            <table className="pure-table pure-table-horizontal">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      
                      this.props.lista.map((autor) =>   {
                          return (
                            <tr key={autor.id}>
                              <td> {autor.nome }</td>
                              <td> {autor.email} </td>
                            </tr>
                          )
                      })
                    }
                  </tbody>
                </table>   
        )
    }
    
}

export default class Autor extends Component {
    constructor() {
        super();
        this.state = {
          lista : [],
        }

      
    }

    componentDidMount() {
        fetch('http://cdc-react.herokuapp.com/api/autores')
        .then(res => res.json())
        .then(json => this.setState({  lista: json }))

        PubSub.subscribe('atualiza-lista-autores', function(topico, novaLista) {
            this.setState({lista: novaLista});
        }.bind(this));
    }

    render() {
        return(
            <div>
                <div className="content" id="content">
                    <FormularioAutor/> 
                </div>
                <TabelaAutor lista={this.state.lista} />
            </div>
        )
    }

}
