import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

it('renders a title', () => {
  const header = shallow(<Header title="My super title" />);

  expect(header.find('h1')).toHaveText('My super title');
});
