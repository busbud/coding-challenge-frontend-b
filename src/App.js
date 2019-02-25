import React, { Component } from 'react';
import './App.css';
import { getDepartures } from './api';

const getAmPmTime = isoDate => {
  const date = new Date(isoDate);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const stringHours = hours % 12;
  const stringMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const abbr = hours > 12 ? 'pm' : 'am';

  return `${stringHours === 0 ? '12' : stringHours}:${stringMinutes} ${abbr}`;
};

class App extends Component {
  state = {
    departures: [],
    locations: []
  };

  async componentDidMount() {
    const { departures, locations } = await getDepartures();
    this.setState({ departures, locations });
  }

  renderDepartures = () => {
    const { departures, locations } = this.state;

    if (!departures.length) {
      return <div>Loading departures ...</div>;
    }

    const departureItems = departures.map(
      (
        {
          departure_time,
          arrival_time,
          origin_location_id,
          destination_location_id,
          prices
        },
        index
      ) => {
        const departureLocation = locations.find(
          elem => elem.id === origin_location_id
        );
        const arrivalLocation = locations.find(
          elem => elem.id === destination_location_id
        );

        return (
          <li data-testid="departure-item" key={index}>
            <h3>
              {departureLocation.name} - {arrivalLocation.name}
            </h3>
            <div>
              {getAmPmTime(departure_time)} - {getAmPmTime(arrival_time)}
            </div>
            <div>
              <b>{`$${prices.total / 100}`}</b>
              <button type="button">Select</button>
            </div>
          </li>
        );
      }
    );

    return <ul>{departureItems}</ul>;
  };

  render() {
    return (
      <main className="App">
        <section className="departures">{this.renderDepartures()}</section>
      </main>
    );
  }
}

export default App;
