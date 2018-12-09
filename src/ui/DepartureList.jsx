import React from 'react';
import ReactDOM from "react-dom";

import DepartureItem from './DepartureItem';

/** Component that display departures in a list. */
export default class DepartureList extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  /**
   * Render buses departures
   */
  render() {
    const departureList = this.props.results.departures.map((departure) => {
      return (
        <DepartureItem
          key={departure.id}
          departure={departure}
          locations={this.props.results.locations}
          operators={this.props.results.operators}
        />
      );
    });
    return (
      <div className="departure-list container">{departureList}</div>
    );
  }

}