import React from 'react';
import _ from 'lodash';
import axios from 'axios';
import { withNamespaces } from 'react-i18next';

import { getCurrentLanguage } from '../services/attribute-service';
import { filterOutDuplicateData } from '../utils/format-departures-data-helper';
import DepartureInfo from '../components/DepartureInfo';
import Loading from '../components/Loading';

const URL =
  'https://napi.busbud.com/x-departures/dr5reg/f25dvk/2019-08-07/poll';

const headers = {
  Accept:
    'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
  'X-Busbud-Token': `${process.env.X_BUSBUD_TOKEN}`,
};

const FETCH_INTERVAL = 3000;

@withNamespaces()
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
    const language = getCurrentLanguage();
    const { currency } = window.localStorage;

    try {
      const index = this.state.data.departures.length;
      const fetchResponse = await axios({
        method: 'get',
        url: `${URL}?index=${index}&lang=${language}&currency=${currency}`,
        headers,
      });

      const { complete } = fetchResponse.data;

      this.setState({
        ...this.state,
        isFetching: true,
        data: this.concatDataToState(fetchResponse.data),
      });

      if (complete) {
        this.clearFetchingInterval();
        this.setState({
          ...this.state,
          isFetching: false,
        });
      }
    } catch (e) {
      const { t } = this.props;
      this.setState({
        ...this.state,
        errorMessage: t('Failed to fetch'),
      });
    }
  };

  concatDataToState = ({ departures, locations, operators }) => {
    const {
      data: {
        departures: stateDepartures,
        locations: stateLocations,
        operators: stateOperators,
      },
    } = this.state;

    return {
      departures: _.concat(stateDepartures, departures),
      locations: _.concat(
        stateLocations,
        filterOutDuplicateData(stateLocations, locations),
      ),
      operators: _.concat(
        stateOperators,
        filterOutDuplicateData(stateOperators, operators),
      ),
    };
  };

  render() {
    const {
      data: { departures, locations },
      isFetching,
    } = this.state;
    const { t } = this.props;
    return (
      <div className="departures-page-container">
        {_.map(departures, departure => {
          return (
            <DepartureInfo
              departure={departure}
              key={departure.busbud_departure_id}
              locations={locations}
            />
          );
        })}
        <div className="departures-loading-container">
          {isFetching ? <Loading /> : t('Request complete')}
        </div>
      </div>
    );
  }
}
