import React from 'react';
import { Departure } from './Departure';

export function DepartureList(props) {
  const orderSplit = props.order.split('/');
  const orderKey = orderSplit[0].split('.');
  const orderDirection = orderSplit[1] || 'ASC';

  const departures = props.departures.sort((a, b) => {
    const direction = orderDirection === 'ASC' ? 1 : -1;

    let aValue = a;
    let bValue = b;

    orderKey.forEach((key) => {
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
      {departures.map(departure => (
        <Departure departure={departure} />
      ))}
    </div>
  );
}

DepartureList.propTypes = {
  departures: React.PropTypes.array.isRequired,
  order: React.PropTypes.string,
};

DepartureList.defaultProps = {
  order: 'departure_time/ASC',
};
