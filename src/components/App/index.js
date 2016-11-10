
import React, { PropTypes } from 'react';
import styles from './styles.scss';

function App() {
  return (
    <div>
      <h1 className={styles.header}>Hello World</h1>
      <div className={styles.content}>
        Welcome to the app.
      </div>
    </div>
  );
}

export default App;
