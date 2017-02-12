import React, { Component } from 'react';
import moment from 'moment-timezone';
import _ from 'lodash';

import { DepartureList } from './DepartureList';
import { Loading } from './Loading';
import { Filters } from './Filters';

import { fetchDepartures } from '../lib/busbud';

export class Challenge extends Component {
  constructor(props) {
    super(props);

    this.subscription = null;

    this.state = {
      lang: 'fr',
      currency: 'CAD',
      order: 'departure_time/ASC',
      locations: [],
      departures: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.fetchDepartures();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.lang !== this.state.lang
      || prevState.currency !== this.state.currency
    ) {
      this.fetchDepartures();
    }
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
      lang: this.state.lang,
      currency: this.state.currency,
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

  handleLang(lang) {
    this.setState({
      lang,
    });
  }

  handleCurrency(currency) {
    this.setState({
      currency,
    });
  }

  handleOrder(order) {
    this.setState({
      order,
    });
  }

  render() {
    return (
      <div>
        <div className="o-header">
          <div className="o-wrapper u-padding">
            <div className="o-logo margin-bottom">
              <img src="/images/logo.png" alt="Osheaga" />
            </div>
          </div>
        </div>

        <div className="o-wrapper u-padding-top u-padding-bottom">
          <div className="u-margin-bottom">
            <h1 className="o-title">
              New York
              <i className="fa fa-arrow-right" />
              Montreal
            </h1>
            <div className="o-subtitle">
              {moment('2017-07-29').format('ll')}
            </div>
          </div>

          <div className="o-layout">
            <div className="o-layout__item u-1-4 u-m-1-1">
              <Filters
                order={this.state.order}
                lang={this.state.lang}
                currency={this.state.currency}
                onChangeOrder={order => this.handleOrder(order)}
                onChangeLang={lang => this.handleLang(lang)}
                onChangeCurrency={currency => this.handleCurrency(currency)}
              />
            </div>
            <div className="o-layout__item u-3-4 u-m-1-1">
              <div className="u-text-center">
                <Loading show={this.state.isLoading} />
              </div>

              <DepartureList
                departures={this.state.departures}
                order={this.state.order}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
