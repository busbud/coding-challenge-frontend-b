import React from 'react';
import PropTypes from 'prop-types';
import { displayISOTime } from './displayData';

const Departure = (props) => {
  const displayPrice = (price) => {
    const pString = String(price);
    return `$${pString.slice(0, -2)}.${pString.slice(-2)} USD`;
  };

  const displayAddress = (address) => {
    return address.join(',\n');
  };

  return (
    <div className="departure-box">
      <div className="box-title">
        <span>{props.operator}</span>
        <span>{displayPrice(props.price)}</span>
      </div>
      <span className="box-header">Departure:</span>
      <div className="box-chunk">
        <span>{displayISOTime(props.departureTime)}</span>
        <span>{displayAddress(props.origin)}</span>
      </div>
      <span className="box-header">Arrival:</span>
      <div className="box-chunk">
        <span>{displayISOTime(props.arrivalTime)}</span>
        <span>{displayAddress(props.destination)}</span>
      </div>
    </div>
  );
};

Departure.propTypes = {
  price: PropTypes.number.isRequired,
  departureTime: PropTypes.string.isRequired,
  arrivalTime: PropTypes.string.isRequired,
  origin: PropTypes.arrayOf(PropTypes.string).isRequired,
  destination: PropTypes.arrayOf(PropTypes.string).isRequired,
  operator: PropTypes.string.isRequired,
};

export default Departure;
