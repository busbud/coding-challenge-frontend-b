import React from 'react';

import styles from './styles.scss';
import '../../shared-styles/globals.scss';

import Departures from '../Departures';

const App = () => (
  <div className={styles.content}>
    <img
      className={styles.banner}
      src="/img/banner.png"
      alt="Osheaga Festival Musique et Arts"
    />
    <Departures />
  </div>
);

export default App;
