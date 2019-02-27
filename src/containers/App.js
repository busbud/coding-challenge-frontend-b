import React from 'react';
import { connect } from 'react-redux';
import { GET_DEPARTURES_LOCATIONS } from '../constants/actionTypes';
import { getDeparturesAndLocations } from '../actions/apiActions';
import { DepartureList } from '../components/DepartureList';

const App = props => <DepartureList {...props} />;

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
