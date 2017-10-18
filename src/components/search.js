import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';

import Loading from './loading';
import Results from './results';

import '../styles/base.scss';

class SearchBtn extends Component {

  constructor(props) {
    super(props);

    this.state = {
      displayResults: false,
      fetchComplete: false,
      departures: [],
      showLoading: false
    };
  }

  _getDepartures(data) {
    if (this.state.displayResults === false && data.complete === true) {
      let dataHolder = [{}];
      let completeHolder = data.complete;

      for (let departure of data.departures) {
        if (departure.id != null) {
          var end = moment(departure.departure_time);
          var start = moment(departure.arrival_time);
          var durationHours = start.diff(end, 'hours');
          var durationMinutes = start.diff(end, 'minutes');
          durationMinutes = durationMinutes - (durationHours*60);

          dataHolder.push({
            departureID        : departure.id,
            operatorImg        : data.operators.find((operator) => operator.id === departure.operator_id).logo_url,
            operator           : data.operators.find((operator)=> operator.id === departure.operator_id).name,
            departureTime      : moment(departure.departure_time).format('LT'),
            departureLocation  : data.locations.find((location) => location.id === departure.origin_location_id).name,
            arrivalTime        : moment(departure.arrival_time).format('LT'),
            arrivalLocation    : data.locations.find((location) => location.id === departure.destination_location_id).name,
            travelHours        : durationHours,
            travelMinutes      : durationMinutes,
            price              : departure.prices.total/100,
            currency           : departure.prices.currency
          })
        }
      }

      let filteredData = dataHolder.filter(value => Object.keys(value).length !== 0);

      this.setState({
        departures: filteredData,
        fetchComplete: completeHolder,
        displayResults: true,
        showLoading: false
      });
    } else if (data.complete === false) {
        if (this.state.showLoading === false || this.state.fetchComplete === false) {
          this.setState({
            fetchComplete: false,
            showLoading: true
          });
        }
      console.log(this.state.displayResults);
      console.log(this.state.fetchComplete);
    }

  }

  search() {
    if (this.state.displayResults === false && this.state.departures.length === 0) {
      return (this._fetchResults());
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
      })).catch((error) => {
        console.log(error);
      });
    }
  }

  render() {
    return (
      <div className="search-btn">
        {<Button bsSize="large" bsStyle="warning" onClick={this.search()}>Search</Button>}
        <Loading  fetchComplete   = { this.state.fetchComplete }
                  showLoading     = { this.state.showLoading } />
        <Results  departures      = { this.state.departures } 
                  displayResults  = { this.state.displayResults } />
      </div>
    )
  }


}

export default SearchBtn;