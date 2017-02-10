import React, { Component } from 'react';
import { DepartureList } from './DepartureList.jsx';

export class Challenge extends Component {
  render() {
    const departures = [{
      departure_time: 100,
      arrival_time: 200,
      departure_location: 'NY',
      arrival_location: 'MTL',
      prices: { total: 300 }
    }];

    return (
      <div>
        <div>
          New York -> Montreal
        </div>
        <div>
          <DepartureList departures={departures}/>
        </div>
      </div>
    );
  }
}
