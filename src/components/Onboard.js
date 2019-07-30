
import React from 'react';
import PropTypes from 'prop-types';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

const Onboard = ({ showDepartures }) => (
  <div className="contentLogin h-100 align-items-center justify-content-center">
    <Jumbotron variant="dark" className="loginWrapper" role="main" aria-labelledby="loginJTTitle">
      <h1 id="loginJTTitle">Welcome to Osheaga Planner</h1>
      <p>
        Plan your trip to the Osheaga Festival env:
      </p>
      <p>
        <Button size="lg" variant="success" onClick={showDepartures}>Check dates</Button>
      </p>
    </Jumbotron>
  </div>
);

Onboard.propTypes = {
  showDepartures: PropTypes.func.isRequired,
};

export default Onboard;
