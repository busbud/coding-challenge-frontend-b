import React from 'react';
import { Departure } from './Departure';

export function DepartureList(props) {
  const departures = props.departures.sort((a, b) => (
    a.departure_time == b.departure_time ?
      0 :
      a.departure_time > b.departure_time ?
        1 :
        -1
  ));

  return (
    <div className="u-margin-top">
      {departures.map(departure => (
        <Departure departure={departure} />
      ))}
    </div>
  );
}

DepartureList.propTypes = {
  departures: React.PropTypes.array.isRequired,
};
