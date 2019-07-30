import React from 'react';
import Card from 'react-bootstrap/Card';

const Departure = ({ departure }) => (
  <Card>
    <Card.Body>
      <p>
        Departure time:
        {' '}
        {departure.departure_time}
        {' '}
        (
        {departure.departure_timezone}
        )
      </p>
      <p>
        Arrival time:
        {' '}
        {departure.arrival_time}
        {' '}
        (
        {departure.arrival_timezone}
        )
      </p>
      <p>Location name: n/a</p>
      <p>
        Price:
        {' '}
        {departure.prices.total}
      </p>
    </Card.Body>
  </Card>
);

export default Departure;
