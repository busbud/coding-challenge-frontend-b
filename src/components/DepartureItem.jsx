/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';

import './styles/DepartureItem.scss';

const formatPrice = price => (price / 100.0).toFixed(2);
const formatDatetime = (datetime, timezone) => DateTime
  .fromISO(datetime)
  .setZone(timezone)
  .setLocale('en')
  .toLocaleString(DateTime.DATETIME_MED);

function DepartureItem({ departure }) {
  const {
    arrival_time,
    destinationLocation,
    departure_timezone,
    departure_time,
    arrival_timezone,
    originLocation,
    prices,
  } = departure;

  const price = formatPrice(prices.total);

  return (
    <div className="DepartureItem">
      <div className="DepartureItem__travel">
        <div className="DepartureItem__city DepartureItem__city--origin">From {originLocation.name}</div>
        <div className="DepartureItem__date DepartureItem__date--origin">At {formatDatetime(departure_time, departure_timezone)}</div>

        <div className="DepartureItem__city DepartureItem__city--destination">To {destinationLocation.name}</div>
        <div className="DepartureItem__date DepartureItem__date--destination">At {formatDatetime(arrival_time, arrival_timezone)}</div>
      </div>

      <div className="DepartureItem__price">
        {`${price}$`}
      </div>
    </div>
  );
}

DepartureItem.propTypes = {
  departure: PropTypes.object.isRequired,
};

export default DepartureItem;
