import React, { Component } from 'react';
import logo from './logo.svg';
import './scss/App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.getSearchResults = this.getSearchResults.bind(this);
  }

  componentDidMount() {
    this.getSearchResults();
  }

  getSearchResults() {
    const url = 'https://napi.busbud.com/x-departures/dr5reg/9mvrg6/2020-09-14';
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
        'X-Busbud-Token': 'PARTNER_BaASYYHxTxuOINEOMWq5GA'
      }
    })
    .then(response => {
        return response.json();
    })
    .then(message => {
      console.log(message);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload. Test
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
