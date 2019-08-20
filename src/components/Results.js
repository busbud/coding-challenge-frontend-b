/* eslint-disable */

import React from 'react';
import { formatMoney, formatDate } from '../helpers/format';

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: this.props.results,
    };
  }

  renderDeparture = (departure, i) => (
    <div className="results-item" key={i} i={i}>
      <div className="results-operator">
        <img src={departure.operator.logo} alt={departure.operator.name} />
      </div>
      <div className="results-price">{formatMoney(departure.price)}</div>
      <div className="results-departure">
        {formatDate(departure.departure_time)} {departure.origin_location.name}
      </div>
      <div className="results-arrival">
        {formatDate(departure.arrival_time)}{' '}
        {departure.destination_location.name}
      </div>
    </div>
  );

  render() {
    const list = this.props.results;

    return (
      <div>
        {Object.keys(list).map((key, i) => this.renderDeparture(list[key], i))}
      </div>
    );
  }
}

export default Results;
