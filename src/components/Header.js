import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <header className="header">
                <div className="header__wrapper">
                    <div className="header__logo">
                        <img src="https://busbud.imgix.net/busbud-logos/busbud_logo.svg?auto=compress%2Cformat" alt="Busbud" />
                        <h1>Frontend Challenge B</h1>
                    </div>
                    <div className="header__author">by KC</div>
                </div>
            </header>
        );
    }
}

export default Header;