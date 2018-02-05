import React, { Component } from 'react';
import './src/styles/styles.css';
import Header from './components/Header.js';
import Form from './components/Form.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Form />
      </div>
    );
  }
}

export default App;
