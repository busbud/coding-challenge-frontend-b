import { getAmPmTime } from '../utils/date-manipulation';
import React from 'react';

export const DepartureListItem = ({
  departureTime,
  arrivalTime,
  departureLocation,
  arrivalLocation,
  prices
}) => (
  <li data-testid="departure-item">
    <h3>
      {departureLocation.name} - {arrivalLocation.name}
    </h3>
    <div>
      {getAmPmTime(departureTime)} - {getAmPmTime(arrivalTime)}
    </div>
    <div>
      <b>{`$${prices.total / 100}`}</b>
      <button type="button">Select</button>
    </div>
  </li>
);
