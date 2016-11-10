
import React, { PropTypes } from 'react';

import styles from './styles.scss';
import '../../shared-styles/globals.scss';


const App = () => (
  <div className={styles.content}>
    <img
      src="https://cloud.githubusercontent.com/assets/1574577/12971188/13471bd0-d066-11e5-8729-f0ca5375752e.png"
      alt="Osheaga Festival Musique et Arts"
    />
    <h1 className={styles.header}>Hello World</h1>
    <p>Welcome to the app.</p>
  </div>
);

export default App;
