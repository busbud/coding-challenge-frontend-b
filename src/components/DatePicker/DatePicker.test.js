import React from 'react';

import renderer from 'react-test-renderer';
import { DatePicker } from './DatePicker';

describe('DatePicker', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<DatePicker onChange={() => {}} label="label" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
