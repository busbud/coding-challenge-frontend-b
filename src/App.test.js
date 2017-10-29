import React from 'react';
import App from './App';
import SearchForm from './SearchForm/SearchForm';
import { shallow } from 'enzyme';
import FoundTrips from './FoundTrips/FoundTrips';

it('renders the search form', () => {
  const app = shallow(<App />);

  expect(app.find(SearchForm)).toBePresent();
});

it('renders the found trips if form has been submitted', () => {
  const app = shallow(<App />);

  app.setState({ hasSubmittedSearchForm: true });

  expect(app.find(FoundTrips)).toBePresent();
});
