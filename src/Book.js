import React, { Component } from 'react';
import InputCustomizado from './Components/InputCustomizado';
import InputSelect from './Components/InputSelect';
import PubSub from 'pubsub-js';
import TratadorErros from '../src/helpers/TratadorErros';

class FormularioLivros extends Component {

    constructor() {
        super();
        this.state = {
            livro: '',
            autorId : '',
            preco: '',
        }

        this.enviaForm = this.enviaForm.bind(this);
    }

    salvaAlteracao(nomeInput, evento) {
        let campo = {};
        campo[nomeInput] = evento.target.value;
        this.setState(campo);
    }
   
    enviaForm(evento) {
        evento.preventDefault();
        
        fetch('https://cdc-react.herokuapp.com/api/livros', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                titulo: this.state.livro,
                preco: this.state.preco,
                autorId: this.state.autorId
            })
        }).then(res => res.json())
            .then(json =>  {
                if(json.status === 400) {
                    new TratadorErros().publicaErros(json) 
                    return
                }
                PubSub.publish('livro-adicionado', json)
                this.state.nome = '';
                this.state.email = '';
                
                PubSub.publish("limpa-erros",{});
            })
            
    }

    render() {
        return(
            <div>
                <form onSubmit={this.enviaForm}>
                <InputCustomizado htmlFor={this.props.listaLivros.id} name="titulo" id={this.props.listaLivros.id}
                    type="text"
                    value={this.state.livro} onChange={this.salvaAlteracao.bind(this, 'livro')} />

                    <select value={ this.state.autorId } name="autorId" onChange={this.salvaAlteracao.bind(this, 'autorId')}>
                    {
                        this.props.listaLivros.map((livro) => {
                            return(
                                <option key={ livro.autor.id+Math.random()} value={livro.autor.id}> {livro.autor.nome}</option>
                            )
                        })
                    }
                    </select>
                    
                    <InputCustomizado htmlFor={this.props.listaLivros.id} name="Preço" id={this.props.listaLivros.id}
                    type="text"
                    value={this.state.preco} onChange={this.salvaAlteracao.bind(this, 'preco')} />

                    <button> Gravar </button>
                </form>   
            </div>
        )
    }
}

class BookTable extends Component {
    
    render() {
        return(
            <table className="pure-table pure-table-horizontal">
               <thead>
                   <tr>
                       <th> Titulo</th>
                       <th> Preço </th>
                       <th> Autor </th>
                   </tr>
               </thead>
               <tbody>
                   {
                        this.props.listaLivros.map((livro) => {
                            return(
                                
                                <tr key={livro.id}>
                                    <td> {livro.titulo}</td>
                                    <td> {livro.preco}</td>
                                    <td> { livro.autor. nome } </td>
                                </tr>
                            )
                        })
                   }
               </tbody>
           </table>
        )
    }
}


export default class Book extends Component {

    constructor() {
        super();

        this.state = {
            listaLivros: [
        
            ]
        }
    }

    componentDidMount() {
        fetch('https://cdc-react.herokuapp.com/api/livros')
            .then(res => res.json())
            .then(json => this.setState({listaLivros : json}))

        PubSub.subscribe('livro-adicionado', function(topico, novaLista) {
            this.setState({listaLivros: novaLista});
        }.bind(this));
    }

    render() {
        return(
            <div>
                <FormularioLivros listaLivros={this.state.listaLivros}> </FormularioLivros>
                <BookTable listaLivros={this.state.listaLivros}></BookTable>
            </div>
        )
    }
}