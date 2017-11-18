import React, { Component } from 'react';
import logo from './styles/img/title.png';
import './styles/App.css';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Root from './containers/Root'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Root />
      </div>
    );
  }
}

export default App;
