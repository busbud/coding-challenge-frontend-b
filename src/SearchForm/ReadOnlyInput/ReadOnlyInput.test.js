import React from 'react';
import { shallow } from 'enzyme';
import ReadOnlyInput from './ReadOnlyInput';

it('renders a read-only input', () => {
  const readOnlyInput = shallow(<ReadOnlyInput />);

  expect(readOnlyInput).toHaveProp('readOnly');
});
