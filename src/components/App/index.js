
import React from 'react';

import styles from './styles.scss';
import '../../shared-styles/globals.scss';

import Departures from '../Departures';

const App = () => (
  <div className={styles.content}>
    <img
      className={styles.banner}
      src="https://cloud.githubusercontent.com/assets/1574577/12971188/13471bd0-d066-11e5-8729-f0ca5375752e.png"
      alt="Osheaga Festival Musique et Arts"
    />
    <Departures />
  </div>
);

export default App;
