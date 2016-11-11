import React from 'react';
import Link from 'react-router/Link';
import Match from 'react-router/Match';
import Miss from 'react-router/Miss';

import styles from './styles.scss';
import '../../shared-styles/globals.scss';

import Welcome from '../Welcome';
import Departures from '../Departures';
import NotFound from '../NotFound';

const App = () => (
  <div className={styles.content}>
    <Link to="/">
      <img
        className={styles.banner}
        src="/img/banner.png"
        alt="Osheaga Festival Musique et Arts"
      />
    </Link>
    <Match exactly pattern="/" component={Welcome} />
    <Match pattern="/departures" component={Departures} />
    <Miss component={NotFound} />
  </div>
);

export default App;
