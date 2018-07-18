import React from 'react';
import DepartureCard from '../DepartureCard';
import renderer from 'react-test-renderer';

import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
// adds moment duration format plugin to moment
momentDurationFormatSetup(moment);

it('renders correctly', () => {
  const tree = renderer
    .create(<DepartureCard
      departureDate="2018-07-30"
      arrivalDate="2018-07-30"
      departureLocation= "Location 1"
      arrivalLocation= "Location 2"
      price={100.32}
      duration={600}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
