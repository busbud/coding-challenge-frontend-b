import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from './Loading';
import DepartureList from './DepartureList';

import { searchDepartures } from '../utils/Api';
import { mapCitiesToDepartures } from '../utils/Departures';

class DeparturesContainer extends Component {
  constructor() {
    super();

    this.state = {
      departures: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    const {
      origin, destination, outboundDate, language,
    } = this.props;

    searchDepartures({
      origin, destination, outboundDate, language,
    }).then(({ locations, departures }) => {
      const completeDepartures = mapCitiesToDepartures(locations, departures);
      this.setState({
        departures: completeDepartures,
        isLoading: false,
      });
    });
  }

  render() {
    const { isLoading, departures } = this.state;

    return (
      <div className="DeparturesContainer">
        {isLoading && <Loading />}

        <DepartureList departures={departures} />
      </div>
    );
  }
}

DeparturesContainer.propTypes = {
  origin: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  outboundDate: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};

export default DeparturesContainer;
