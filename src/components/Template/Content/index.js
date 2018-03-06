import React, {Component} from 'react';
import content from './content.css'
import Header from "../Header";
import Footer from "../Footer";
import {Segment} from 'semantic-ui-react'

class Content extends Component {

    render() {
        return [
            <Header key="header-key"/>,
            <div className={content.container} key="content-key">
                <Segment className={content.main}>
                    {this.props.children}
                </Segment>
            </div>,
            <Footer key="footer-key"/>

        ];
    }
}

export default Content;