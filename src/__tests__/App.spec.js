import React from 'react';
import App from '../App';
import renderer from 'react-test-renderer';
jest.mock('../components/searchForm/SearchForm', () => 'SearchForm');
jest.mock('../components/departures/Departures', () => 'Departures');

it('renders correctly', () => {
  const tree = renderer
    .create(<App />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});