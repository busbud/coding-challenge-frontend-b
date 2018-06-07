/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import './styles/DepartureItem.scss';

function DepartureItem({ departure }) {
  const {
    arrival_time,
    destinationLocation,
    departure_time,
    originLocation,
    prices,
  } = departure;

  return (
    <div className="DepartureItem">
      <div>From {originLocation.name}</div>
      <div>At {departure_time}</div>

      <div>To {destinationLocation.name}</div>
      <div>At {arrival_time}</div>

      <div className="DepartureItem__price">
        {prices.total}
      </div>
    </div>
  );
}

DepartureItem.propTypes = {
  departure: PropTypes.object.isRequired,
};

export default DepartureItem;
