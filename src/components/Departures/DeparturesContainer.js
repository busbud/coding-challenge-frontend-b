import React, { Component } from 'react';
import arrayFind from 'array-find';
import objectAssign from 'object-assign';

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
      date: '2 July 2017',
      language: 'en',
      currency: 'CAD',
      adultCount: 1,
      departures: [],
      complete: false,
    };
  }

  componentDidMount() {
    this.fetch();
  }

  fetch(index) {
    const { origin, destination, date, language, currency, adultCount } = this.state;
    fetchDepartures({
      origin: origin.geohash,
      destination: destination.geohash,
      outboundDate: new Date(date).toISOString().slice(0, 10),
      adult: adultCount,
      lang: language,
      currency,
      index,
    }).then(data => {
      this.setState({
        departures: [
          ...this.state.departures,
          ...data.departures.map(departure => {
            const operator = arrayFind(data.operators, operator =>
              departure.operator_id === operator.id
            );
            return objectAssign({}, departure, {
              operator,
            });
          }),
        ],
        complete: data.complete,
      }, () => {
        if (!this.state.complete) {
          this.fetch(this.state.departures.length, 200);
        }
      });
    }).catch(err => console.error(err)) // TODO: real error handling
  }

  render() {
    return <Departures {...this.state} />;
  }
}

export default DeparturesContainer;
