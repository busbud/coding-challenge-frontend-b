import React from 'react';

import renderer from 'react-test-renderer';
import { proposedTripList } from './fixtures/proposedTripList';

import { ProposedTripList } from './ProposedTripList';

describe('ProposedTripList', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ProposedTripList proposedTrips={proposedTripList} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
