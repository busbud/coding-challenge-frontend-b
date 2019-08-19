import React, { Component } from 'react';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      departures: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  searchResults = () => {
    this.setState({ isLoading: true }, () => {
      const apiUrl =
        'https://napi.busbud.com/x-departures/f25dvk/dr5reg/2020-08-02';

      const requestOptions = {
        method: 'GET',
        headers: {
          Accept:
            'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
          'X-Busbud-Token': 'PARTNER_AHm3M6clSAOoyJg4KyCg7w',
        },
      };

      fetch(apiUrl, requestOptions)
        .then(results => results.json())
        .then(data => {
          const locations = data.locations.map(location => ({
            id: location.id || '',
            name: location.name || '',
          }));

          const departures = data.departures.map(departure => ({
            departure_time: departure.departure_time || '',
            arrival_time: departure.arrival_time || '',
            price: departure.prices.total,
            location: locations.find(
              location => location.id === departure.destination_location_id
            ),
          }));

          this.setState({
            isLoading: false,
            departures: [...departures],
          });

          console.log(departures);
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
    const { isLoading } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <p>Search Form {isLoading && <span>Loading...</span>}</p>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default SearchForm;
