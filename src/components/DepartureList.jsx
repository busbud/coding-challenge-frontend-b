import React from 'react';
import { Departure } from './Departure';

export function DepartureList({ departures, sort }) {
  // Split sort string (key and direction are separated with a '/')
  const sortSplit = sort.split('/');
  // Get nested keys as an array
  const sortKey = sortSplit[0].split('.');
  // Get direction, or defaut to 'ASC'
  const sortDirection = sortSplit[1] || 'ASC';

  // Sort departures
  const sortedDepartures = departures.sort((a, b) => {
    // Get direction factor
    const direction = sortDirection === 'ASC' ? 1 : -1;

    let aValue = a;
    let bValue = b;

    // Get nested value (if needed)
    sortKey.forEach((key) => {
      aValue = aValue[key];
      bValue = bValue[key];
    });

    // And compare values
    if (aValue === bValue) {
      return 0;
    }

    return aValue > bValue ? direction : -direction;
  });

  return (
    <div className="u-margin-top">
      {sortedDepartures.map(departure => (
        <Departure departure={departure} />
      ))}
    </div>
  );
}

DepartureList.propTypes = {
  departures: React.PropTypes.array.isRequired,
  sort: React.PropTypes.string,
};

DepartureList.defaultProps = {
  sort: 'departure_time/ASC',
};
