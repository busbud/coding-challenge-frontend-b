import React from 'react';
import { shallow } from 'enzyme';
import { assocPath } from 'ramda';
import getMockStore from '../testHelpers';
import { initialState } from '../store';
import { initializeSearch } from '../actions';

import SearchStatus from './SearchStatus';

const changeSearchStatusTo = (newStatus) => {
  return assocPath(['metadata', 'searchStatus'], newStatus, initialState);
};

const renderWithSearchStatus = (status) => {
  const store = getMockStore(changeSearchStatusTo(status));
  return shallow(<SearchStatus store={store} />).dive();
};

it('begins search when button is clicked', () => {
  const store = getMockStore(initialState);

  shallow(<SearchStatus store={store} />).dive()
    .find('.search-button').simulate('click');
  expect(store.getActions())
    .toEqual(expect.arrayContaining([initializeSearch()]));
});

it('shows loading icon when search is in progress', () => {
  const result = renderWithSearchStatus('inProgress');

  expect(result.find('.search-progress').exists()).toEqual(true);
});

it('shows search complete when polling is over', () => {
  const result = renderWithSearchStatus('complete');

  expect(result.find('.search-complete').exists()).toEqual(true);
});

it('shows error message when api returns 4xx or 5xx', () => {
  const result = renderWithSearchStatus('error');

  expect(result.find('.search-error').exists()).toEqual(true);
});
