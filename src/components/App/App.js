// @flow
import React from 'react';
import { Provider } from 'react-redux';
import styles from './App.css';

import configureStore from '../../store/configureStore';

import Search from '../Search';

const store = configureStore();

export const App = () => (
  <Provider store={store}>
    <div className={styles.App}>
      <Search />
    </div>
  </Provider>
);
