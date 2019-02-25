import React, { Component } from 'react';

export default class InputSelect extends Component {
    
    constructor() {
        super();
        this.state = {
            autorId : '',
        }

        this.setAutorID = this.setAutorID.bind(this)
    }

    setAutorID(event) {
        this.setState({
            autorId: event.target.value
        })
    }

    render() {
        return(
            <div>
                {/* <select value={ this.state.autorId } name="autorId" onChange={this.props.onChange}>
                    {
                        this.props.listaLivros.map((livro) => {
                            return(
                                <option key={ livro.autor.id_autor } value={livro.autor.id_autor}> {livro.autor.nome}</option>
                            )
                        })
                    }
                    
                </select> */}
            </div>
        )
    }
}