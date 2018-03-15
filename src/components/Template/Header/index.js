import React, {Component} from 'react';
import header from './header.css'
import {Menu} from 'semantic-ui-react'
import {Link, withRouter} from 'react-router-dom'

class Header extends Component {

    state = {page: 'propostas'};

    handleItemClick = (e, { name }) => this.setState({ page: name });

    render() {

        const {page} = this.state;

        return (
            <header className={header.container}>
                <Menu pointing className={header.menu}>
                    <Menu.Item name="propostas" active={page === 'propostas'}  as={Link} to="/"  onClick={this.handleItemClick}/>
                </Menu>
            </header>
        );
    }
}

export default withRouter(Header);