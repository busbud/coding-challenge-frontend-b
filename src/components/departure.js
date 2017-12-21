import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Departure extends React.Component {
  render () {
    return (
      <li>
        {this.props.departure_time}
        {this.props.arrival_time}
        {this.props.prices.total}
      </li>
    );
  }
}

Departure.propTypes = {
  departure_time: PropTypes.string,
  arrival_time: PropTypes.string,
  prices: PropTypes.shape({
    total : PropTypes.integer
  })
}

export default Departure;
