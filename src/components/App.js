import React, { Component } from 'react';
import Ticket from './Ticket';
import '../stylesheets/App.css';

class App extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick();
  }

  render() {
    const departures = this.props.departures;

    return (
      <div className="App container-fluid">
        <div className="App-header">
          <a href="https://www.osheaga.com/en">
            <img
              src="https://www.osheaga.com/images/osheaga/en/logo.png?v=d2aee02373618ce9d7231e1bb5fe51f0"
              alt="Osheaga"
            ></img>
          </a>
        </div>
        <div className="title">
          <h1>Road to Osheaga</h1>
          <div>
            <p className="powered-by">powered by:</p>
            <a href="https://www.busbud.com/en-ca/" target="_blank" ref="noopener noreferrer">
              <img src="/busbud_logo_norm_RGB_HR.png" alt="Busbud"></img>
            </a>
          </div>
        </div>
        <div className="ticket-container">
          {!departures && <button onClick={this.handleClick}>Go</button>}
          {departures && departures.length > 0 && departures.map((s, i) =>
            <Ticket
              key={i}
              departure={s}
            ></Ticket>
          )}
          {this.props.searchFailed && <p>Search failed. Please try again</p>}
        </div>
      </div>
    );
  }
}

export default App;
