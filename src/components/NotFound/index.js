import React from 'react';
import Link from 'react-router/Link';

import styles from './styles.scss';

const NotFound = () => (
  <div className={styles.notfound}>
    <h3 className={styles.center}>
      We had trouble finding what you wanted...
    </h3>
    <Link className="button" to="/">Try going back home?</Link>
  </div>
);

export default NotFound;
