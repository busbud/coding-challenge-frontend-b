import React, { Component } from 'react';
import { sortByDate } from '../helpers/format';
import { apiUrl, departureCity, arrivalCity, departureDate } from '../settings';
import Results from './Results';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      departures: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  searchResults = (
    url = `${apiUrl}/${departureCity.geohash}/${arrivalCity.geohash}/${departureDate}`,
    fromPoll = false
  ) => {
    this.setState({ isLoading: true }, () => {
      const requestOptions = {
        method: 'GET',
        headers: {
          Accept:
            'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
          'X-Busbud-Token': 'PARTNER_AHm3M6clSAOoyJg4KyCg7w',
        },
      };

      fetch(url, requestOptions)
        .then(results => results.json())
        .then(data => {
          const locations = data.locations.map(location => ({
            id: location.id || '',
            name: location.name || '',
          }));

          const operators = data.operators.map(operator => ({
            id: operator.id || '',
            logo: operator.logo_url || '',
            name: operator.name || '',
          }));

          const departures = data.departures.map(departure => ({
            departure_time: departure.departure_time || '',
            arrival_time: departure.arrival_time || '',
            price: departure.prices.total,
            origin_location: locations.find(
              location => location.id === departure.origin_location_id
            ),
            destination_location: locations.find(
              location => location.id === departure.destination_location_id
            ),
            operator: operators.find(
              operator => operator.id === departure.operator_id
            ),
          }));

          let totalDepartures = [];

          if (data.complete && fromPoll) {
            totalDepartures = [...this.state.departures, ...departures];
            this.setState({ isLoading: false });
            console.log(`From poll: ${totalDepartures.length}`);
          } else if (data.complete && !fromPoll) {
            totalDepartures = [...departures];
            this.setState({ isLoading: false });
            console.log(`From complete: ${totalDepartures.length}`);
          } else {
            totalDepartures = [...this.state.departures, ...departures];

            const newUrl = `${apiUrl}/${departureCity.geohash}/${arrivalCity.geohash}/${departureDate}/poll?index=${departures.length}`;
            setTimeout(() => {
              this.searchResults(newUrl, true);
            }, 2000);
            console.log(`NOT Complete: + ${totalDepartures.length}`);
          }

          this.setState({ departures: totalDepartures.sort(sortByDate) });
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    this.searchResults();
  }

  render() {
    const { isLoading, departures } = this.state;

    return (
      <div className="results">
        <button type="button" onClick={this.handleSubmit} className="button">
          Click to see our departures !
        </button>
        <div className="loading">
          {isLoading && <div>Loading more rides...</div>}
        </div>
        <Results results={departures} />
      </div>
    );
  }
}

export default SearchForm;
