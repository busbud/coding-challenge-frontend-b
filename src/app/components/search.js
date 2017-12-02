import React, {Component} from 'react';
import axios from 'axios';

import SearchForm from './searchForm';

export default class Search extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      date: '2 August 2018',
      adultsNumber: 1
    };
  }

  handleRequestApi() {
    return async requestData => {
      try {
        const response = await axios({
          method: 'post',
          url: `https://napi.busbud.com/x-departures/${requestData.cityFrom}/:destination/:outbound_date`,
          headers: {
            Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
            'X-Busbud-Token': 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A'
          },
          data: {pew: 'pew'}
        });

        console.log(response, requestData);
      } catch (error) {
        console.log(error);
      }
    };
  }

  render() {
    return (
      <div className="nymo-search">
        <p>
          As this is pre-alpha version we provide tickets <b>only</b> on the <b>{this.state.date}</b> for <b>{this.state.adultsNumber}</b> adult.
          Nevertheless we promise to add more dates and functionality in the future! :)
        </p>
        <SearchForm
          onSubmit={this.handleRequestApi()}
          />
        Results!
      </div>
    );
  }
}
