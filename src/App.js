import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import { initializeSearch } from './actions';
import AppBox from './AppBox';
import AppHeader from './AppHeader';
import './App.css';

const App = ({ dispatch }) => {
  const searchNow = () => {
    return dispatch(initializeSearch());
  };

  return (
    <AppBox>
      <AppHeader />

      <Button className="button" onClick={searchNow}>
        Search Now
      </Button>
    </AppBox>
  );
};

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(App);
