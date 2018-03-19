import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ResultsScreen.css';
import DepartureResult from '../departure-result/DepartureResult';

class ResultsScreen extends Component {
  render() {
    const { departures } = this.props;

    return (
      <div>
        <h4>Available trips:</h4>
        {departures.map((departure,index) => {
          return <DepartureResult 
            key={`departure${index}`}
            departureTime={departure.departureTime}
            arrivalTime={departure.arrivalTime}
            departureLocation={departure.departureLocation}
            arrivalLocation={departure.arrivalLocation}
            price={departure.price}
            operatorName={departure.operatorName}
          />
        })}
      </div>
    );
  }
}

ResultsScreen.propTypes = {
  departures: PropTypes.array
}

export default ResultsScreen;