import React from 'react';

import renderer from 'react-test-renderer';
import { suggestions } from './fixtures';

import { LocationSelector } from './LocationSelector';

describe('LocationSelector', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<LocationSelector suggestions={suggestions} label="label" onKeyDown={() => {}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
