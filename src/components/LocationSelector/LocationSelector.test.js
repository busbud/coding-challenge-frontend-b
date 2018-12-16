import React from 'react';

import renderer from 'react-test-renderer';
import { suggestions } from './fixtures/arrival-fixture';

import { LocationSelector } from './LocationSelector';

describe('LocationSelector', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <LocationSelector
          suggestions={suggestions}
          isErrored={false}
          label="label"
          onKeyDown={() => {}}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
