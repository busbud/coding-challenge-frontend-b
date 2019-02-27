import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GET_DEPARTURES_LOCATIONS, POLL_START } from '../constants/actionTypes';
import { getDeparturesAndLocations } from '../actions/apiActions';
import { DepartureListItem } from '../components/DepartureListItem';

import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.getDeparturesAndLocations();
  }

  render() {
    const { loadingDepartures, departures, locations } = this.props;

    return (
      <main className="App">
        <ul className="departures">
          {loadingDepartures ? (
            <li>Loading departures ...</li>
          ) : (
            departures.map(
              ({
                busbud_departure_id,
                departure_time,
                arrival_time,
                origin_location_id,
                destination_location_id,
                prices
              }) => {
                const departureLocation = locations.find(
                  elem => elem.id === origin_location_id
                );
                const arrivalLocation = locations.find(
                  elem => elem.id === destination_location_id
                );
                return (
                  <DepartureListItem
                    key={busbud_departure_id}
                    departureTime={departure_time}
                    arrivalTime={arrival_time}
                    departureLocation={departureLocation}
                    arrivalLocation={arrivalLocation}
                    prices={prices}
                  />
                );
              }
            )
          )}
        </ul>
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
