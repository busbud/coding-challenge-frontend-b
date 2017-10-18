import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';

import Results from './results';

import '../styles/base.scss';

class SearchBtn extends Component {

  constructor(props) {
    super(props);

    this.state = {
      displayResults: false,
      fetchComplete: false,
      departures: []
    };
  }

  _getDepartures(data) {
    if (this.state.displayResults === false && this.state.fetchComplete === true) {
      let dataHolder = {};
      let completeHolder = data.complete;

      for (let departure of data.departures) {
        dataHolder.operatorImg        = data.operators.find((operator) => operator.id === departure.operator_id).logo_url;
        dataHolder.operator           = data.operators.find((operator)=> operator.id === departure.operator_id).name;
        dataHolder.departureTime      = moment(data.departure_time).format('LT');
        dataHolder.departureLocation  = data.locations.find((location) => location.id === departure.origin_location_id).name;
        dataHolder.arrivalTime        = moment(data.arrival_time).format('LT');
        dataHolder.arrivalLocation    = data.locations.find((location) => departure.destination_location_id).name;
        dataHolder.price              = departure.prices.total/100;
        dataHolder.currency           = departure.prices.currency;
      }
      this.setState({
        departures: dataHolder,
        fetchComplete: completeHolder
      });
      this._getDepartures(this.state.departures);
    } else {
      this.search();
      console.log(this.search())
    }

  }

  search() {
    if (this.state.displayResults === false && this.state.departures.length === 0) {
      return (this._fetchResults());
      this._fetchResults();
    }
  }

  _fetchResults() {
    return (dispatch) => {
      return axios.get('https://napi.busbud.com/x-departures/dr5reg/f25dvk/2018-08-02', 
      {
        'headers': {
          'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
          'X-Busbud-Token': 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A'
        }
      }).then((response => {
        dispatch(this._getDepartures(response.data));
      })).then(console.log(this.state.departures), console.log(this.state.displayResults))
      .catch((error) => {
        console.log(error);
      });
    }
  }

  _displayResults(data) {
    if (this.state.displayResults === false || this.state.departures.complete === true) {
      this.setState({
        displayResults: true
      })
    }

    return (
        <Results departures= { this.state.departures } />
    )
  }

  render() {
    return (
      <div className="search-btn">
        {<Button bsSize="large" bsStyle="warning" onClick={this.search()}>Search</Button>}
      </div>
    )
  }


}

export default SearchBtn;