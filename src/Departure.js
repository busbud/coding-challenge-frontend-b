import React from 'react';
import PropTypes from 'prop-types';

const Departure = (props) => {
  return (
    <div className="departure-box">
      <div className="table-chunk" >
        <p>{props.origin}</p>
        <p>{props.destination}</p>
      </div>
      <div className="table-chunk" >
        <div>
          <p>{props.price}</p>
          <p>{props.operator}</p>
        </div>
        <div>
          <p>{props.departureTime}</p>
          <p>{props.arrivalTime}</p>
        </div>
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
