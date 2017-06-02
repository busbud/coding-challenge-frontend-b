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
          <p>powered by Busbud</p>
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
