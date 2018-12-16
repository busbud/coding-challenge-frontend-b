import React from 'react';

import renderer from 'react-test-renderer';
import { proposedTripList } from './fixtures/proposedTripList';

import { ProposedTripList } from './ProposedTripList';

describe('LocationSelector', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ProposedTripList proposedTrip={proposedTripList} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
