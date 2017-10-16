import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

import '../styles/base.scss';

class SearchBtn extends Component {

  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {

    return (
      <div className="search-btn">
        {<Button bsSize="large" bsStyle="warning" onClick={this.getDepartures}>Search</Button>}
      </div>
    )
  }

  getDepartures() {
    return axios.get('https://napi.busbud.com/x-departures/dr5reg/f25dvk/2018-0802', 
    {
      'headers': {
        'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
        'X-Busbud-Token': 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A'
      }
    }).then(response => {
      console.log(response.data);
    }).catch((error) => {
      console.log(error)
    });
  }
}

export default SearchBtn;