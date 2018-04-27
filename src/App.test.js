import React from 'react';
import { shallow } from 'enzyme';
import { assoc } from 'ramda';
import getMockStore from './testHelpers';
import { initialState } from './store';
import { initializeSearch } from './actions';

import App from './App';

it('begins search when button is clicked', () => {
  const store = getMockStore(initialState);

  shallow(<App store={store} />).dive().find('.button').simulate('click');
  expect(store.getActions())
    .toEqual(expect.arrayContaining([initializeSearch()]));
});

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
    }],
    operators: [{ id: 'x', displayName: 'Coach Operator' }],
  };
  const store = getMockStore(assoc('tripInformation', testTripInfo, initialState));

  expect(shallow(<App store={store} />).prop('departures'))
    .toEqual([{
      price: 2700,
      departureTime: 'Friday, April 27th 2018, 14:55',
      arrivalTime: 'Friday, April 27th 2018, 18:55',
      origin: ['park', 'street', 'the city'],
      destination: ['pool', 'road', 'the town'],
      operator: 'Coach Operator',
    }]);
});
