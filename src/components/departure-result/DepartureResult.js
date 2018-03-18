import React, { Component } from 'react';
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

export default DepartureResult;