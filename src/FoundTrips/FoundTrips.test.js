import React from 'react';
import { shallow } from 'enzyme';
import FoundTrips from './FoundTrips';
import Loading from './Loading/Loading';
import Trip from './Trip/Trip';
import createTrip from './fixtures/createTrip';

it('renders a loader', () => {
  const foundTrips = shallow(<FoundTrips />);

  expect(foundTrips.find(Loading)).toBePresent();
});

it('renders trips when data are fetched with success', () => {
  const foundTrips = shallow(<FoundTrips />);
  const trips = [createTrip(), createTrip(), createTrip()];

  foundTrips.setState({ isSearching: false, trips });

  expect(foundTrips.find(Trip).length).toBe(3);
});
