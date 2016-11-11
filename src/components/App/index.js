import React from 'react';
import Match from 'react-router/Match';
import Miss from 'react-router/Miss';

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
    <Match exactly pattern="/" component={Yo} />
    <Match pattern="/departures" component={Departures} />
    <Miss component={NotFound} />
  </div>
);

const Yo = () => <div>Well you are here...</div>;

const NotFound = () => <div>404</div>;

export default App;
