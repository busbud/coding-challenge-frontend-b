import { getAmPmTime } from '../utils/date-manipulation';
import React from 'react';

import styles from './DepartureListItem.module.css';

export const DepartureListItem = ({
  departureTime,
  arrivalTime,
  departureLocation,
  arrivalLocation,
  prices
}) => (
  <li className={styles['departure-item']} data-testid="departure-item">
    <div className={styles['departure-description']}>
      <p>
        {departureLocation.name} - {arrivalLocation.name}
      </p>
      <h3>
        {getAmPmTime(departureTime)} - {getAmPmTime(arrivalTime)}
      </h3>
    </div>
    <div className={styles['departure-offer']}>
      <p>
        <b>{`$${prices.total / 100}`}</b>
      </p>
      <button className={styles.button} type="button">
        Select
      </button>
    </div>
  </li>
);
