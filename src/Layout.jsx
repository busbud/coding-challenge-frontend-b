import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router";
import logo from './logo.svg';

class Layout extends React.Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.jsx</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer">
                        Learn React
                    </a>
                    {this.props.children}
                </header>
            </div>
        );
    };
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(Layout);