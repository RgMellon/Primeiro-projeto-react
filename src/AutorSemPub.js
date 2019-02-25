import React, { Component } from 'react';
import InputCustomizado from './Components/InputCustomizado';

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
          .then(json => this.props.callbackAtualizaLIstagem(json))
          .catch(err => console.log(err))
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

        this.atualizaListagem = this.atualizaListagem.bind(this)
    }

    componentDidMount() {
        fetch('http://cdc-react.herokuapp.com/api/autores')
        .then(res => res.json())
        .then(json => this.setState({  lista: json }))
    }

    atualizaListagem(novaLista) {
        this.setState({lista: novaLista})    
    }

    render() {
        return(
            <div>
                <div className="content" id="content">
                    <FormularioAutor callbackAtualizaLIstagem = {this.atualizaListagem}/> 
                </div>
                <TabelaAutor lista={this.state.lista} />
            </div>
        )
    }

}
