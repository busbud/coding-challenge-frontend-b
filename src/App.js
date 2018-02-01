import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchForm from './search-form.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Bus schedule from NYC to Montreal</h1>
        </header>
        {/* <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        <SearchForm />
      </div>
    );
  }
}

export default App;
