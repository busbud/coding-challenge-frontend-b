import React, { Component } from 'react';
import moment from 'moment';
import _ from 'lodash';

import { DepartureList } from './DepartureList';
import { fetchDepartures } from '../lib/busbud';

export class Challenge extends Component {
  constructor(props) {
    super(props);

    this.subscription = null;

    this.state = {
      locations: [],
      departures: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.fetchDepartures();
  }

  componentDidUnmount() {
    this.cancelFetch();
  }

  fetchDepartures() {
    this.setState({
      locations: [],
      departures: [],
      isLoading: true,
    });

    this.subscription = fetchDepartures({
      origin: 'dr5reg', // New-York
      destination: 'f25dvk', // Montreal
      outbound_date: '2017-07-29',
      adult: 1,
      lang: 'fr',
      currency: 'eur',
    }).subscribe(
      // Concat departures
      (response) => {
        this.setState((prevState) => {
          const locations = prevState.locations.concat(response.locations);
          const departures = prevState.departures.concat(
            response.departures.map((departure) => {
              const originLocation = _.find(locations, {
                id: departure.origin_location_id,
              });

              const destinationLocation = _.find(locations, {
                id: departure.destination_location_id,
              });

              return Object.assign(departure, {
                origin: originLocation,
                destination: destinationLocation,
              });
            })
          );

          return {
            departures,
            locations,
          };
        });
      },

      // Log errors
      (err) => {
        this.console(err);
      },

      // Once complete
      () => {
        this.setState({ isLoading: false });
      }
    );
  }

  cancelFetch() {
    if (this.subscription) {
      this.subscription.dispose();
    }
  }

  render() {
    return (
      <div>
        <div className="o-header">
          <div className="o-wrapper u-padding">
            <h1 className="o-title">
              New York
              <i className="fa fa-arrow-right" />
              Montreal
            </h1>
            <div className="o-subtitle">
              {moment('2017-07-29').format('ll')}
            </div>
          </div>
        </div>

        <div className="o-wrapper">
          <DepartureList departures={this.state.departures} />
        </div>
      </div>
    );
  }
}
