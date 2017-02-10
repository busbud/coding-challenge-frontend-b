import React from 'react';
import { Departure } from './Departure.jsx';

export function DepartureList(props) {
  return (
    <div>
      {props.departures.map((departure) => (
        <Departure departure={departure}/>
      ))}
    </div>
  );
}
