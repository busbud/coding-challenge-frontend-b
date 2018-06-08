import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';

import Loading from './Loading';
import DepartureList from './DepartureList';
import Message from './Message';

import { searchDepartures } from '../utils/Api';
import { mapCitiesToDepartures } from '../utils/Departures';

const isDateBeforeOpeningDate = (datetime, timezone) => {
  const arrivalDate = DateTime.fromISO(datetime).setZone(timezone);
  const festivalDate = DateTime.fromISO('2018-08-03T12:00:00').setZone('America/Montreal');

  return arrivalDate < festivalDate;
};

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
    // eslint-disable-next-line camelcase
    const filteredDepartures = departures.filter(({ arrival_time, arrival_timezone }) => isDateBeforeOpeningDate(arrival_time, arrival_timezone));
    const completeDepartures = mapCitiesToDepartures(locations, filteredDepartures);

    this.setState({
      departures: completeDepartures,
      hasFail: false,
      isLoading: false,
    });
  }

  handleRestartSearch() {
    this.setState({
      hasFail: false,
      isLoading: true,
    });

    this.handleSearchDepartures();
  }

  render() {
    const { isLoading, departures, hasFail } = this.state;

    const shouldShowNoResultInformation = departures.length === 0 && !isLoading && !hasFail;

    return (
      <div className="DeparturesContainer">
        {hasFail && <Message
          type="error"
          messageKey="error"
          onRestartSearch={this.handleRestartSearch}
        />}

        {shouldShowNoResultInformation && <Message
          type="info"
          messageKey="infoNoResult"
          onRestartSearch={this.handleRestartSearch}
        />}

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
