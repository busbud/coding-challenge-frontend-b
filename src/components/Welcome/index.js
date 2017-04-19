import React from 'react';
import Link from 'react-router/Link';
import classNames from 'classnames';

import styles from './styles.scss';

const Welcome = () => (
  <div className={styles.welcome}>
    <h3 className={styles.center}>Coming from New York?</h3>
    <p className={styles.center}>Find a route to the <strong>Osheaga Festival</strong> in <strong>Montréal</strong> from <strong>New York City</strong> by hitting the button below.</p>
    <Link
      to="/departures"
      className={classNames('button button-primary', styles.center, styles.btn)}
    >
      Book a Bus
    </Link>
  </div>
);

export default Welcome;
