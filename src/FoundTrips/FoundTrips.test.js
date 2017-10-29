import React from 'react';
import { shallow } from 'enzyme';
import FoundTrips from './FoundTrips';
import { Loader } from 'semantic-ui-react';

it('renders a loader', () => {
  const foundTrips = shallow(<FoundTrips />);

  expect(foundTrips.find(Loader)).toBePresent();
});
