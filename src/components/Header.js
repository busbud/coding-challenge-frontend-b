import React, { Component } from 'react';
import logo from './logo.png';

class Header extends Component {
    render() {
        return (
            <header className="header">
            <img src={logo} className="logo" alt="logo" />
          </header>
        );
    }
}

export default Header;

