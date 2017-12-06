import React from 'react';
import DepartureItem from './DepartureItem';
import './DepartureList.css';

const DepartureList = props => {

  const sortedDepartures = props.departures.sort((dep1, dep2) => (
    dep1.departureDate > dep2.departureDate ? 1 : 0
  ));

  const items = sortedDepartures.map(departure => (
    <DepartureItem
      key={departure.id}
      departureDate={departure.departureDate}
      arrivalDate={departure.arrivalDate}
      origin={departure.origin}
      destination={departure.destination}
      price={departure.price}
      currency={departure.currency}
    />
  ));

  const emptyList = (
    <div className="notification">
      <p>No departures found</p>
    </div>
  );

  return (
    items.length === 0 ? emptyList : (
      <div className="DepartureList">
        {items}
      </div>
    )
  );
};

export default DepartureList;
