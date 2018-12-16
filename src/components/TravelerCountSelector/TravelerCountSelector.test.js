import React from 'react';

import renderer from 'react-test-renderer';
import { TravelerCountSelector } from './TravelerCountSelector';

describe('TravelerCountSelector', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<TravelerCountSelector isErrored travelerType="children" onChange={() => {}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
