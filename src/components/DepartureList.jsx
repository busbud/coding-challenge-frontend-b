import React from 'react';
import { Departure } from './Departure';

export function DepartureList(props) {
  return (
    <div>
      {props.departures.map(departure => (
        <Departure departure={departure} />
      ))}
    </div>
  );
}

DepartureList.propTypes = {
  departures: React.PropTypes.array.isRequired,
};
