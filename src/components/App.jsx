/***
 * @author Shiming Chen <chen@lemontv.me>
 */

import React from 'react';
import { Departures } from 'containers';
import './App.css';

const defaultQuery = {
  origin: 'dr5reg',
  destination: 'f25dvk',
  outbound_date: '2019-08-03'
}

const defaultParams = {
  adult: 1,
  child: 0,
  senior: 0,
  lang: 'en',
  currency: 'USD'
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    props.search(defaultQuery, defaultParams);
  }

  render() {
    console.log('Start app');
    return (
      <div className="App">
        <h1>Depature schedules</h1>
        <Departures />
      </div>
    );
  }
}
