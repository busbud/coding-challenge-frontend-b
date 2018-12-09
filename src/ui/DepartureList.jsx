import React from 'react';

import PropTypes from 'prop-types';

import { Results } from '../types';

import DepartureItem from './DepartureItem';

/** Component that display departures in a list. */
export default class DepartureList extends React.PureComponent {
  /**
   * Render buses departures
   */
  render() {
    const { results, currency } = this.props;
    const departureList = results.departures.map(departure => (
      <DepartureItem
        key={departure.id}
        departure={departure}
        locations={results.locations}
        operators={results.operators}
        currency={currency}
      />));
    return (
      <div className="departure-list">{departureList}</div>
    );
  }
}

DepartureList.propTypes = {
  results: Results.isRequired,
  currency: PropTypes.string.isRequired,
};
