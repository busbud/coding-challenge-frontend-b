import React, { Component } from 'react';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  searchResults = () => {
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
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleSubmit(event) {
    event.preventDefault();
    this.searchResults();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <p>Search Form</p>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default SearchForm;
