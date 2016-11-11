import React from 'react';

import styles from './styles.scss';

const Departure = ({ departure_time, arrival_time, originName, destinationName, prices: { total } }) => (
  <div className={styles.departure}>
    <div><strong>Departure time:</strong> {new Date(departure_time).toLocaleTimeString()}</div>
    <div><strong>Arrival time:</strong> {new Date(arrival_time).toLocaleTimeString()}</div>
    <div><strong>Start location:</strong> {originName}</div>
    <div><strong>End location:</strong> {destinationName}</div>
    <div><strong>Price:</strong> {'$' + (total / 100).toFixed(2)}</div>
  </div>
);

export default Departure;
