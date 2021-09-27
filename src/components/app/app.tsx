import React, {Suspense, lazy} from 'react';

import styles from './app.module.less';
import styles2 from './app.module.scss';
import DepartureSearch from '../../departures/departureSearch';
import DepartureList from '../../departures/departureList';

export const App = (): React.ReactElement => (
    <div className={styles.stylesContainer}>
        <div className={styles2.stylesHeader}>It works</div>
            <DepartureSearch />
            <DepartureList />
    </div>
);
