import React from 'react';
import { Departure } from './Departure';

export function DepartureList({ departures, sort }) {
  const sortSplit = sort.split('/');
  const sortKey = sortSplit[0].split('.');
  const sortDirection = sortSplit[1] || 'ASC';

  const sortedDepartures = departures.sort((a, b) => {
    const direction = sortDirection === 'ASC' ? 1 : -1;

    let aValue = a;
    let bValue = b;

    sortKey.forEach((key) => {
      aValue = aValue[key];
      bValue = bValue[key];
    });

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
