import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Content from "./components/Template";
import Proposta from "./components/Proposta";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Content>
                    <Switch>
                        <Route path="/" component={Proposta}/>
                    </Switch>
                </Content>
            </BrowserRouter>
        );
    }
}

export default App;
