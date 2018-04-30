import React from 'react';
import { shallow } from 'enzyme';
import { assoc } from 'ramda';
import getMockStore from '../testHelpers';
import { initialState } from '../store';

import DeparturesList from './DeparturesList';

const departuresProp = (storeTripInformation) => {
  const store = getMockStore(assoc('tripInformation', storeTripInformation, initialState));
  return shallow(<DeparturesList store={store} />).prop('departures');
};

it('maps state to props correctly', () => {
  const testTripInfo = {
    locations: [
      { id: 1, name: 'park', address: ['street', 'the city'] },
      { id: 2, name: 'pool', address: ['road', 'the town'] },
    ],
    departures: [{
      prices: { total: 2700 },
      arrivalTime: '2018-04-27T18:55:00',
      departureTime: '2018-04-27T14:55:00',
      originLocationId: 1,
      destinationLocationId: 2,
      operatorId: 'x',
      id: 'a',
    }],
    operators: [{ id: 'x', displayName: 'Coach Operator' }],
  };

  expect(departuresProp(testTripInfo))
    .toEqual([{
      price: 2700,
      arrivalTime: '2018-04-27T18:55:00',
      departureTime: '2018-04-27T14:55:00',
      origin: ['park', 'street', 'the city'],
      destination: ['pool', 'road', 'the town'],
      operator: 'Coach Operator',
      id: 'a',
    }]);
});

it('sorts by departureTime prop', () => {
  const testTripInfo = {
    departures: [
      { departureTime: '2018-04-27T18:55:00' },
      { departureTime: '2018-04-29T18:55:00' },
      { departureTime: '2018-04-26T14:55:00' },
    ],
  };

  expect(departuresProp(testTripInfo))
    .toEqual([
      { departureTime: '2018-04-26T14:55:00' },
      { departureTime: '2018-04-27T18:55:00' },
      { departureTime: '2018-04-29T18:55:00' },
    ]);
});

it('sorts by arrivalTime prop in a tie-break', () => {
  const testTripInfo = {
    departures: [
      { departureTime: '2018-04-27T18:55:00', arrivalTime: '2018-04-28T12:55:00' },
      { departureTime: '2018-04-27T18:55:00', arrivalTime: '2018-04-28T10:00:00' },
      { departureTime: '2018-04-27T19:57:00', arrivalTime: '2018-04-28T09:00:00' },
    ],
  };

  expect(departuresProp(testTripInfo))
    .toEqual([
      { departureTime: '2018-04-27T18:55:00', arrivalTime: '2018-04-28T10:00:00' },
      { departureTime: '2018-04-27T18:55:00', arrivalTime: '2018-04-28T12:55:00' },
      { departureTime: '2018-04-27T19:57:00', arrivalTime: '2018-04-28T09:00:00' },
    ]);
});
