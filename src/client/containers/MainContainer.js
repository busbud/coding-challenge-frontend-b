import React, { Component } from 'react';

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isComplete: false,
      departures: {},
      index: 0,
    };
  }

  componentDidMount() {}

  initialSearch() {
    fetch('https://napi.busbud.com/x-departures/dr5reg/f25dvk/2019-11-07/?adult=1', {
      mode: 'cors', // no-cors, *cors, same-origin
      // cache: 'no-store', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
        'X-Busbud-Token': 'PARTNER_AHm3M6clSAOoyJg4KyCg7w',
      },
    })
      .then(data => data.json())
      .then(obj => {
        console.log(obj);

        // if complete is true, don't send additional requests
        if (obj.complete) {
        } else {
          // if complete is false, send short polling requests
          // start polling
        }
      });
  }

  pollSearch() {}

  render() {
    return <div>MainContainer</div>;
  }
}

export default MainContainer;
