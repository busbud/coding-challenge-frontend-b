import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

import '../styles/base.scss';

class SearchBtn extends Component {

  constructor() {
    super();
    this.state = {
      displayResults: false,
      departures: {}
    };
  }

  search() {
    return (dispatch) => {
      return axios.get('https://napi.busbud.com/x-departures/dr5reg/f25dvk/2018-08-02', 
      {
        'headers': {
          'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
          'X-Busbud-Token': 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A'
        }
      }).then((response => {
        dispatch(this._displayResults(response.data));
      })).then(console.log(this.state.departures), console.log(this.state.displayResults))
      .catch((error) => {
        console.log(error);
        this.setState({displayResults: false});
      });
    }
  }

  _displayResults(data) {
    if (this.state.displayResults === false || this.state.departures.complete === true) {
      this.setState({
        displayResults: true,
        departures: data
      })
    }
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