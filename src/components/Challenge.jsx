import React, { Component } from 'react';
import { DepartureList } from './DepartureList';
import { fetchDepartures } from '../lib/busbud';

export class Challenge extends Component {
  constructor(props) {
    super(props);

    this.subscription = null;

    this.state = {
      departures: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.fetchDepartures();
  }

  componentDidUnmount() {
    // Cancel subscription on unmount
    if (this.subscription) {
      this.subscription.dispose();
    }
  }

  fetchDepartures() {
    this.setState({ isLoading: true });

    this.subscription = fetchDepartures({
      origin: 'dr5reg', // New-York
      destination: 'f25dvk', // Montreal
      outbound_date: '2017-07-29',
      adult: 1,
      lang: 'fr',
      currency: 'eur',
    }).subscribe(
      // Concat departures
      (departures) => {
        this.setState({
          departures: this.state.departures.concat(departures),
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

  render() {
    return (
      <div>
        <div>
          New York - Montreal
        </div>
        <div>
          <DepartureList departures={this.state.departures} />
        </div>
      </div>
    );
  }
}
