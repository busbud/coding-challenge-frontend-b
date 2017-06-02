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
    return (
      <div className="App container">
        <div className="App-header">
          <h2>Road to Osheaga</h2>
          <p>powered by Busbud</p>
        </div>
        <div className="ticket-container">
          {this.props.departures.length === 0 &&
            <button onClick={this.handleClick}>Go</button>
          }
          {this.props.departures.length > 0 && this.props.departures.map((s, i) =>
            <Ticket
              key={i}
              depTime={s.departure_time}
              arrTime={s.arrival_time}
              from={this.props.cities[0].name}
              to={this.props.cities[1].name}
              price={s.prices.total}
            ></Ticket>
          )}
          {this.props.searchFailed && <p>Search failed. Please try again</p>}
        </div>
      </div>
    );
  }
}

export default App;
