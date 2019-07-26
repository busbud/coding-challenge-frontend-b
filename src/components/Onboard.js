
import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

const Onboard = () => (
  <div className="contentLogin h-100 align-items-center justify-content-center">
    <Jumbotron variant="dark" className="loginWrapper" role="main" aria-labelledby="loginJTTitle">
      <h1 id="loginJTTitle">Welcome to Osheaga Planner</h1>
      <p>
        Plan your trip to the Osheaga Festival
      </p>
      <p>
        <Button size="lg" variant="success">Check dates</Button>
      </p>
    </Jumbotron>
  </div>
);

export default Onboard;