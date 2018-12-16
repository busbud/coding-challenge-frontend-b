import React from 'react';

import renderer from 'react-test-renderer';
import { proposedTrip } from './fixtures/proposedTrip';

import { ProposedTrip } from './ProposedTrip';

describe('LocationSelector', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ProposedTrip {...proposedTrip} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
