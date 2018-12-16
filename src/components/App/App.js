// @flow
import React from 'react';
import styles from './App.css';

import { Search } from '../Search';
import { ProposedTripList } from '../ProposedTripList';

type Props = {| onSearch: () => void |};

export const App = (props: Props) => {
  const { onSearch } = props;
  return (
    <div className={styles.App}>
      <Search onSearch={onSearch} />
      <ProposedTripList proposedTrips={[]} />
    </div>
  );
};
