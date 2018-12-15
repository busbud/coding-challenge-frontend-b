import React from 'react';

import renderer from 'react-test-renderer';
import { TravelerCountSelector } from './Tata';

describe('TravelerCountSelector', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<TravelerCountSelector onChange={() => {}} label="label" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
