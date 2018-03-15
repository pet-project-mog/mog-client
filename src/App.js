import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Content from "./components/Template";
import Offer from "./components/Offer";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Content>
                    <Switch>
                        <Route path="/" component={Offer}/>
                    </Switch>
                </Content>
            </BrowserRouter>
        );
    }
}

export default App;
