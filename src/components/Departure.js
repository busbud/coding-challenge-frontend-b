import React from 'react';
import Card from 'react-bootstrap/Card';

const Departure = ({ departure }) => (
  <Card>
    <Card.Body>
      <h2>{departure}</h2>
      <p>Departure time: xx</p>
      <p>Arrival time: xx</p>
      <p>Location name: xx</p>
      <p>Price: xx</p>
    </Card.Body>
  </Card>
);

export default Departure;
