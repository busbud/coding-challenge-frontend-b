import React, { Component } from 'react';

import Departures from './Departures';
import fetchDepartures from '../../services/clientFetchDepartures';

class DeparturesContainer extends Component {
  constructor(props) {
    super(props);
    /* Most of this information is static
     * but it's the sort of information that
     * could start changing, so storing it as
     * state is good.
     */
    this.state = {
      origin: {
        name: 'New York',
        geohash: 'dr5reg',
      },
      destination: {
        name: 'Montréal',
        geohash: 'f25dvk',
      },
      date: '29 July 2017',
      adultCount: 1,
      allDeparturesFetched: false,
      departures: [],
    };

    this.lastIndexFetched = -1;
  }

  componentDidMount() {
    this.fetchNextBatch();
  }

  fetchNextBatch() {
    const {
      origin,
      destination,
      date,
      adultCount,
      allDeparturesFetched,
    } = this.state;
    if (allDeparturesFetched) {
      return;
    }
    fetchDepartures({
      origin: origin.geohash,
      destination: destination.geohash,
      outboundDate: new Date(date).toISOString().slice(0, 10),
      adult: adultCount,
      index: ++this.lastIndexFetched,
    }).then(departures => this.setState({
      departures: [...this.state.departures, departures],
      allDeparturesFetched: Boolean(departures.complete),
    })).catch(err => console.error(err)) // TODO: real error handling
  }

  render() {
    return (
      <Departures
        {...this.state}
        fetchNextBatch={() => this.fetchNextBatch()}
      />
    );
  }
}

export default DeparturesContainer;
