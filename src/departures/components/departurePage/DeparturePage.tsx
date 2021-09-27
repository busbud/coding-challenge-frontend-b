import React from 'react';

import DepartureList from '../departureList';
import DepartureSearch from '../departureSearch';
import styles from './DeparturePage.styles.scss';

const DeparturePage = (): React.ReactElement => (
    <div className={styles.container}>
        <DepartureSearch />
        <DepartureList />
    </div>
);

export default DeparturePage;
