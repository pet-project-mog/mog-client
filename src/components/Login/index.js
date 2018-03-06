import React, {Component} from "react";
import login from './login.css'
import {Form, Button} from 'semantic-ui-react'

class Login extends Component {

    state = {username: "", password: "", invalidUsername: false, invalidPassword: false};

    handleLogin = () => {

        const {username, password} = this.state;


        if (username !== 'wilinando') {
            this.setState({invalidUsername: true})
        }


        if (password !== '123') {
            this.setState({invalidPassword: true})
        }

        console.log(`${username} - ${password}`)
    };

    handleChange = (e, {name, value}) => this.setState({[name]: value, invalidUsername: false, invalidPassword: false});


    render() {

        const {username, password, invalidUsername, invalidPassword} = this.state;

        return (
            <div className={login.content}>
                <Form onSubmit={this.handleLogin}>
                    <Form.Field>
                        <Form.Input error={invalidUsername} label="Username" name="username" placeholder="Your Username"
                                    content={username} onChange={this.handleChange} required/>
                    </Form.Field>


                    <Form.Field>
                        <Form.Input error={invalidPassword} label="Password" name="password" type="password"
                                    placeholder="Your Username" content={password} onChange={this.handleChange}
                                    required/>
                    </Form.Field>
                    <Button type="submit">Log in</Button>
                </Form>
            </div>
        );
    }

}

export default Login;