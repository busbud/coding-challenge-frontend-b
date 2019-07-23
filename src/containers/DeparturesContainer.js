import React from 'react';
import _ from 'lodash';

import { fetchDepartures } from '../services/fetch-departures-service';
import { filterOutDuplicateData } from '../utils/format-departures-data-helper';
import DepartureInfo from '../components/DepartureInfo';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';

const FETCH_INTERVAL = 3000;

export default class DeparturesContainer extends React.Component {
  state = {
    data: {
      departures: [],
      operators: [],
      locations: [],
    },
    errorMessage: '',
    isFetching: true,
  };

  scheduleFetchingDepartures = async () => {
    this.fetchDepartures();
    this.pollingDepratureInterval = setInterval(() => {
      this.fetchDepartures();
    }, FETCH_INTERVAL);
  };

  clearFetchingInterval = async () => {
    clearInterval(this.pollingDepratureInterval);
  };

  componentDidMount() {
    this.scheduleFetchingDepartures();
  }

  componentWillUnmount() {
    this.clearFetchingInterval();
  }

  fetchDepartures = async () => {
    const index = this.state.data.departures.length;

    try {
      const fetchResponse = await fetchDepartures(index);

      const {
        complete,
        departures: newDepartures,
        operators: newOperators,
        locations: newLocations,
      } = fetchResponse;
      const { departures, locations, operators } = this.state.data;

      this.setState({
        ...this.state,
        isFetching: complete ? false : true,
        data: {
          departures: _.concat(departures, newDepartures),
          locations: _.concat(
            locations,
            filterOutDuplicateData(locations, newLocations),
          ),
          operators: _.concat(
            operators,
            filterOutDuplicateData(operators, newOperators),
          ),
        },
      });

      if (complete) {
        this.clearFetchingInterval();
        if (_.isEmpty(newDepartures)) {
          this.setState({
            ...this.state,
            errorMessage: 'No departures available',
          });
        }
      }
    } catch (e) {
      this.clearFetchingInterval();
      this.handleError();
    }
  };

  handleError = async () => {
    this.setState({
      ...this.state,
      isFetching: false,
      errorMessage: 'Could not find departures',
    });
  };

  render() {
    const {
      data: { departures, locations, operators },
      isFetching,
      errorMessage,
    } = this.state;

    return (
      <div className="departures-page-container">
        {errorMessage && <ErrorMessage text={errorMessage} />}
        {_.map(departures, departure => {
          return (
            <DepartureInfo
              departure={departure}
              key={departure.busbud_departure_id}
              locations={locations}
              operators={operators}
            />
          );
        })}
        {isFetching && <Loading />}
      </div>
    );
  }
}
