import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import { map } from 'ramda';
import { initializeSearch } from './actions';
import formatDepartureData from './formatDepartureData';
import AppBox from './AppBox';
import AppHead from './AppHead';
import Departure from './Departure';
import './App.css';

const App = ({ dispatch, departures }) => {
  const searchNow = () => {
    return dispatch(initializeSearch());
  };

  return (
    <AppBox>
      <AppHead />

      <Button className="button" onClick={searchNow}>
        Search Now
      </Button>
      <body className="App-body">
        {map(departureInfo => <Departure {...departureInfo} />, departures)}
      </body>
    </AppBox>
  );
};

const mapStateToProps = ({ tripInformation }) => {
  const departures = formatDepartureData(tripInformation);
  return { departures };
};

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  departures: PropTypes.arrayOf(PropTypes.object),
};

App.defaultProps = {
  departures: [],
};

export default connect(mapStateToProps)(App);
