import React from 'react';
import { App } from './App';
import SearchForm from './SearchForm/SearchForm';
import { shallow } from 'enzyme';
import FoundTrips from './FoundTrips/FoundTrips';

it('renders the search form as onboarding screen', () => {
  const app = shallow(<App />);

  app.setProps({ shouldDisplayOnboarding: true });

  expect(app.find(SearchForm)).toBePresent();
});

it('renders the found trips if onboarding screen is hidden', () => {
  const app = shallow(<App />);

  app.setProps({ shouldDisplayOnboarding: false });

  expect(app.find(FoundTrips)).toBePresent();
});
