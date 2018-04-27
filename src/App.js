import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import { initializeSearch } from './actions';
import formatDepartureData from './formatDepartureData';
import AppBox from './AppBox';
import AppHeader from './AppHeader';
import './App.css';

const App = ({ dispatch, departures }) => {
  const searchNow = () => {
    return dispatch(initializeSearch());
  };
  console.log(departures);

  return (
    <AppBox>
      <AppHeader />

      <Button className="button" onClick={searchNow}>
        Search Now
      </Button>
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
