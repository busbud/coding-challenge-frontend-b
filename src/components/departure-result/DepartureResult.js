import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './DepartureResult.css';

class DepartureResult extends Component {
  render() {
    const { departureTime, arrivalTime, departureLocation, arrivalLocation, price, operatorName } = this.props;

    return (
      <div className="departure-result">
        <h4>{operatorName}</h4>
        <div className="price">
          {`${Math.floor(price/100)}$`}
        </div>
        <div className="departure-and-arrival">
          <p>Departure: <strong>{departureTime}</strong> ({departureLocation})</p>
          <p>Arrival: <strong>{arrivalTime}</strong> ({arrivalLocation})</p>
        </div>
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