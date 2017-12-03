import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';
import Spinner from 'react-spinner';
import classNames from 'classnames';

import {cities} from '../data/cities';
import Departure from './departure';

export default class Search extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loading: false,
      data: {}
    };

    this.headers = {
      Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
      'X-Busbud-Token': 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A'
    };
    this.requestData = {
      props: {
        from: cities['New York'],
        to: cities['Montreal'],
        date: '2018-08-02'
      },
      data: {
        adult: 1,
        currency: 'EUR'
      }
    };

    this.handleRequestApi = this.handleRequestApi.bind(this);
  }

  handleRequestApi() {
    this.setState({
      loading: true
    });

    this.sendRequest()();
  }

  sendRequest() {
    const {props, data} = this.requestData;

    return async () => {
      try {
        const response = await axios({
          method: 'get',
          url: `https://napi.busbud.com/x-departures/${props.from}/${props.to}/${props.date}`,
          headers: this.headers,
          data
        });

        this.setState({
          loading: false,
          data: response.data
        });
      } catch (error) {
        this.setState({
          loading: false
        });

        throw error;
      }
    };
  }

  render() {
    const {data} = this.state;
    const {props: searchProps, data: searchData} = this.requestData;
    const date = moment(searchProps.date).format('Do MMMM YYYY');

    return (
      <div className="nymo-search">
        <p>
          As this is pre-alpha version we provide tickets <b>only</b> on the <b>{date}</b> for <b>{searchData.adult}</b> adult.
          Nevertheless we promise to add more dates and functionality in the future! :)
        </p>
        <div className="nymo-search-form">
          <button
            className={classNames('nymo-search-form__submit button', {
              'nymo-search-form__submit--loading': this.state.loading
            })}
            onClick={this.handleRequestApi}
            >
            <Spinner/>
            Search
          </button>
        </div>
        { data.departures && data.departures.length &&
          <ul className="results">
            { data.departures.map(departure => (
              <Departure
                key={departure.id}
                data={data}
                departure={departure}
                currency={searchData.currency}
                />
              ))
            }
          </ul>
        }
      </div>
    );
  }
}
