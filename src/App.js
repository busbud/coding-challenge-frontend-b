import React, { Component } from 'react';
import './App.css';
import Header from './components/Header.js';
import Search from './components/Search.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Search />
      </div>
    );
  }
}

export default App;
