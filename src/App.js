import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import { initializeSearch } from './actions';
import AppBox from './components/AppBox';
import AppHead from './components/AppHead';
import DeparturesList from './containers/DeparturesList';
import './App.css';

const App = ({ dispatch }) => {
  const searchNow = () => {
    return dispatch(initializeSearch());
  };

  return (
    <AppBox>
      <AppHead />

      <Button className="button" onClick={searchNow}>
        Search Now
      </Button>
      <DeparturesList />
    </AppBox>
  );
};

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(App);
