import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loading from './Loading';
import DepartureList from './DepartureList';
import ErrorMessage from './ErrorMessage';

import { searchDepartures } from '../utils/Api';
import { mapCitiesToDepartures } from '../utils/Departures';

class DeparturesContainer extends Component {
  constructor() {
    super();

    this.state = {
      departures: [],
      isLoading: true,
      hasFail: false,
    };

    this.handleSearchDepartures = this.handleSearchDepartures.bind(this);
    this.handleSearchDeparturesFailure = this.handleSearchDeparturesFailure.bind(this);
    this.handleSearchDeparturesSuccess = this.handleSearchDeparturesSuccess.bind(this);
    this.handleRestartSearch = this.handleRestartSearch.bind(this);
  }

  componentDidMount() {
    this.handleSearchDepartures();
  }

  handleSearchDepartures() {
    const {
      origin, destination, outboundDate, language,
    } = this.props;

    searchDepartures({
      origin, destination, outboundDate, language,
    })
      .then(({ locations, departures }) => this.handleSearchDeparturesSuccess(locations, departures))
      .catch(() => this.handleSearchDeparturesFailure());
  }

  handleSearchDeparturesFailure() {
    this.setState({
      hasFail: true,
      isLoading: false,
    });
  }

  handleSearchDeparturesSuccess(locations, departures) {
    const completeDepartures = mapCitiesToDepartures(locations, departures);
    this.setState({
      departures: completeDepartures,
      isLoading: false,
    });
  }

  handleRestartSearch() {
    this.setState({
      isLoading: true,
    });

    this.handleSearchDepartures();
  }

  render() {
    const { isLoading, departures, hasFail } = this.state;

    return (
      <div className="DeparturesContainer">
        {hasFail && <ErrorMessage onRestartSearch={() => this.handleRestartSearch()} />}

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
