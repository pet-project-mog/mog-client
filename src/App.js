import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './components/Login';
import Content from "./components/Template";
import {PropostaForm} from "./components/Proposta";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Content>
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/" component={PropostaForm}/>
                    </Switch>
                </Content>
            </BrowserRouter>
        );
    }
}

export default App;
