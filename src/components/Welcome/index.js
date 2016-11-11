import React from 'react';
import Link from 'react-router/Link';

const Welcome = () => (
  <div>
    <h1>Coming from New York?</h1>
    <p>Find a route to the Osheaga festival in Montréal from New York City by hitting the button below.</p>
    <Link to="/departures">Book a Bus</Link>
  </div>
);

export default Welcome;
