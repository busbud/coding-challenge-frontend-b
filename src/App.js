import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GET_DEPARTURES_LOCATIONS } from './constants/actionTypes';
import { getDeparturesAndLocations } from './actions/apiActions';

import './App.css';

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
  async componentDidMount() {
    this.props.getDeparturesAndLocations();
  }

  renderDepartures = () => {
    const { departures, locations } = this.props;

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

const mapStateToProps = ({ departures, locations, isLoading }) => ({
  departures,
  locations,
  loadingDepartures: isLoading[GET_DEPARTURES_LOCATIONS]
});

export default connect(
  mapStateToProps,
  {
    getDeparturesAndLocations
  }
)(App);
