import React from 'react';
import { shallow } from 'enzyme';
import getMockStore from './testHelpers';
import { initialState } from './store';
import { initializeSearch } from './actions';

import App from './App';

it('begins search when button is clicked', () => {
  const store = getMockStore(initialState);

  shallow(<App store={store} />).dive().find('.button').simulate('click');
  expect(store.getActions())
    .toEqual(expect.arrayContaining([initializeSearch()]));
});
