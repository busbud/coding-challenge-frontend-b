import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';

import {cities} from '../data/cities';
import Departure from './departure';

export default class Search extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      searchRequest: {
        props: {
          from: cities['New York'],
          to: cities['Montreal'],
          date: '2018-08-02'
        },
        data: {
          adult: 1
        }
      },
      tickets: {}
    };
  }

  handleRequestApi() {
    const {props, data} = this.state.searchRequest;
    // departure time, the arrival time, the location name and the price (use prices.total of the departure

    return async () => {
      try {
        const response = await axios({
          method: 'get',
          url: `https://napi.busbud.com/x-departures/${props.from}/${props.to}/${props.date}`,
          headers: {
            Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
            'X-Busbud-Token': 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A'
          },
          data
        });

        this.setState({
          searchResponse: response.data
        });
      } catch (error) {
        console.log(error);
      }
    };
  }

  render() {
    const {props, data} = this.state.searchRequest;
    const {departures} = this.state.tickets;
    const date = moment(props.date).format('Do MMMM YYYY');

    return (
      <div className="nymo-search">
        <p>
          As this is pre-alpha version we provide tickets <b>only</b> on the <b>{date}</b> for <b>{data.adult}</b> adult.
          Nevertheless we promise to add more dates and functionality in the future! :)
        </p>
        <div className="nymo-search-form">
          <button
            className="nymo-search-form__submit button"
            onClick={this.handleRequestApi()}
            >
            Search
          </button>
        </div>
        { departures && departures.length &&
          <ul className="results">
            { departures.map(departure => (
              <Departure
                key={departure.id}
                data={departure}
                />
              ))
            }
          </ul>
        }
      </div>
    );
  }
}
