import React, { Component } from 'react';
import moment from 'moment-timezone';
import _ from 'lodash';

import { DepartureList } from './DepartureList';
import { fetchDepartures } from '../lib/busbud';

const langs = [{
  code: 'en',
  name: 'English',
}, {
  code: 'fr',
  name: 'Français',
}];

const currencies = [{
  code: 'CAD',
  name: '$',
}, {
  code: 'EUR',
  name: '€',
}];

export class Challenge extends Component {
  constructor(props) {
    super(props);

    this.subscription = null;

    this.state = {
      lang: langs[0].code,
      currency: currencies[0].code,
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

  render() {
    return (
      <div>
        <div className="o-header">
          <div className="o-wrapper u-padding">
            {this.state.isLoading ? <div className="loading" /> : ''}

            <div className="o-logo margin-bottom">
              <img src="https://cloud.githubusercontent.com/assets/1574577/12971188/13471bd0-d066-11e5-8729-f0ca5375752e.png" alt="Osheaga" />
            </div>

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

        <div className="o-wrapper o-margin-top o-margin-bottom u-text-right">
          <select value={this.state.lang} onChange={e => this.handleLang(e.target.value)}>
            {langs.map(lang => (
              <option value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>

          <select value={this.state.currency} onChange={e => this.handleCurrency(e.target.value)}>
            {currencies.map(currency => (
              <option value={currency.code}>
                {currency.name}
              </option>
            ))}
          </select>
        </div>

        <div className="o-wrapper">
          <DepartureList departures={this.state.departures} />
        </div>
      </div>
    );
  }
}
