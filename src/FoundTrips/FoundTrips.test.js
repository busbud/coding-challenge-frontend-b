import React from 'react';
import { shallow } from 'enzyme';
import { FoundTrips } from './FoundTrips';
import Loading from './Loading/Loading';
import Trip from './Trip/Trip';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import createTrip from './fixtures/createTrip';

it('renders a loader when it is fetching', () => {
  const foundTrips = shallow(<FoundTrips trips={[]} />);

  foundTrips.setProps({ isFetching: true });

  expect(foundTrips.find(Loading)).toBePresent();
});

it('renders trips when data are fetched with success', () => {
  const foundTrips = shallow(<FoundTrips trips={[]} />);

  const trips = [createTrip(), createTrip(), createTrip()];
  foundTrips.setProps({ isFetching: false, hasError: false, trips });

  expect(foundTrips.find(Trip).length).toBe(3);
});

it('renders error message when data are fetched with error', () => {
  const foundTrips = shallow(<FoundTrips trips={[]} />);

  foundTrips.setProps({ hasError: true });

  expect(foundTrips.find(ErrorMessage)).toBePresent();
});
