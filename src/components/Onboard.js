
import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { Translate } from 'react-redux-i18n';

const Onboard = ({ showDepartures }) => (
  <Container className="mt-5">
    <Jumbotron variant="dark" role="main" aria-labelledby="onboardTitle">
      <h1 className="display-4" id="onboardTitle"><Translate value="onboard.title" /></h1>
      <p className="lead">
        <Translate value="onboard.text" />
      </p>
      <p>
        <Button size="lg" variant="primary" className="btn-onboard" onClick={showDepartures}><Translate value="onboard.callToAction" /></Button>
      </p>
    </Jumbotron>
  </Container>
);

Onboard.propTypes = {
  showDepartures: PropTypes.func.isRequired,
};

export default Onboard;
