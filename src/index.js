import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import AutorBox from '../src/Autor';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Book from '../src/Book';
import App from './App';

ReactDOM.render((
  
    <BrowserRouter>
    
    
    <App>
        <Switch>
            <Route path="/" exact={true} component={App} />
            <Route path="/autor" component={AutorBox} />
            <Route path="/livro" component={Book} />
        </Switch>
    </App>
    
    </BrowserRouter>
  ), document.getElementById('root'));

serviceWorker.unregister();
