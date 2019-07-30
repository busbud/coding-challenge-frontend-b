
import React from 'react';
import PropTypes from 'prop-types';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { Translate } from 'react-redux-i18n';

const Onboard = ({ showDepartures }) => (
  <div className="contentLogin h-100 align-items-center justify-content-center">
    <Jumbotron variant="dark" className="loginWrapper" role="main" aria-labelledby="loginJTTitle">
      <h1 id="loginJTTitle"><Translate value="onboard.title" /></h1>
      <p>
        <Translate value="onboard.text" />
      </p>
      <p>
        <Button size="lg" variant="success" onClick={showDepartures}><Translate value="onboard.callToAction" /></Button>
      </p>
    </Jumbotron>
  </div>
);

Onboard.propTypes = {
  showDepartures: PropTypes.func.isRequired,
};

export default Onboard;
