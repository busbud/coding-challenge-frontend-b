import React from 'react';

export default function SearchList({results}) {
  return results && results.length ?
    results.map(({id, originLocName, price, destLocName, arrivalTime, departureTime}) => {
      return <div key={id}>{originLocName} {destLocName} {arrivalTime} {departureTime} {price}</div>;
    }) : 'No result';
}
