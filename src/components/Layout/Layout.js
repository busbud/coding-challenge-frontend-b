import React from 'react';

import Navbar from './Navbar/Navbar';
import styles from './Layout.module.scss';

const Layout = (props) => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <div className={styles.container}>{props.children}</div>
    </div>
  );
};

export default Layout;
