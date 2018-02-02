import React, { Component } from 'react';
import './App.css';
import Header from './components/Header.js';
import Form from './components/Form.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="work-area">
          <Form />
        </div>
      </div>
    );
  }
}

export default App;
