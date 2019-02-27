import React from 'react';
import { connect } from 'react-redux';
import { GET_DEPARTURES_LOCATIONS } from '../constants/actionTypes';
import { getDeparturesAndLocations } from '../actions/apiActions';
import { DepartureList } from '../components/DepartureList';

const App = props => <DepartureList {...props} />;

const searchParams = {
  originCity: {
    name: 'New York',
    geohash: 'dr5reg'
  },
  destinationCity: {
    name: 'Montreal',
    geohash: 'f25dvk'
  },
  departureDate: '2019-08-02'
};

const mapStateToProps = ({ departures, locations, isLoading }) => ({
  departures,
  locations,
  loadingDepartures: isLoading[GET_DEPARTURES_LOCATIONS],
  searchParams
});

export default connect(
  mapStateToProps,
  {
    getDeparturesAndLocations
  }
)(App);
