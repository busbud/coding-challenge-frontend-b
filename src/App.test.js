import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  shallow(<App />);
});

it('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toEqual(3);
});
