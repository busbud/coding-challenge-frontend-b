import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DepartureList from './DepartureList';
import { searchDepartures } from '../utils/Api';
import { mapCitiesToDepartures } from '../utils/Departures';

class DeparturesContainer extends Component {
  constructor() {
    super();

    this.state = {
      departures: [],
    };
  }
  componentDidMount() {
    const { origin, destination, outboundDate } = this.props;
    searchDepartures(origin, destination, outboundDate).then(({ locations, departures }) => {
      const completeDepartures = mapCitiesToDepartures(locations, departures);
      this.setState({ departures: completeDepartures });
    });
  }

  render() {
    return (
      <div className="DeparturesContainer">
        <DepartureList departures={this.state.departures} />
      </div>
    );
  }
}

DeparturesContainer.propTypes = {
  origin: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  outboundDate: PropTypes.string.isRequired,
};

export default DeparturesContainer;
