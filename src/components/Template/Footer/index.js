import React, { Component } from 'react';
import footer from './footer.css'
class Footer extends Component {
    render() {
        return (
            <footer className={footer.container}>
                <div>
                    <span className={footer.title}>MOG - Gerador de propostas</span>
                </div>
            </footer>
        );
    }
}

export default Footer;