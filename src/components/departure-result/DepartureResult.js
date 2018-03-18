import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './DepartureResult.css';

class DepartureResult extends Component {
  render() {
    const { departureTime, arrivalTime, departureLocation, arrivalLocation, price, operatorName } = this.props;

    return (
      <div className="departure-result">
        <h4>{operatorName}</h4>
        <p>Departure: <strong>{departureTime}</strong> ({departureLocation})</p>
        <p>Arrival: <strong>{arrivalTime}</strong> ({arrivalLocation})</p>
        <p>{`${Math.floor(price/100)}$`}</p>
      </div>
    );
  }
}

DepartureResult.propTypes = {
  departureTime: PropTypes.string, 
  arrivalTime: PropTypes.string, 
  departureLocation: PropTypes.string, 
  arrivalLocation: PropTypes.string, 
  price: PropTypes.number, 
  operatorName: PropTypes.string
}

export default DepartureResult;