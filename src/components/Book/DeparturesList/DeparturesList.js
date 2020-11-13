import React from 'react';
import PropTypes, { object } from 'prop-types';

import Departure from './Departure/Departure';
import Card from '../../shared/Card/Card';
import styles from './DeparturesList.module.scss';

const DeparturesList = (props) => {
  const { departures } = props;

  if (!departures?.length) return null;

  return (
    <div className={styles.container}>
      {departures.map((departure) => (
        <Card key={departure.id}>
          <Departure departure={departure} />
        </Card>
      ))}
    </div>
  );
};

DeparturesList.propTypes = {
  departures: PropTypes.arrayOf(object),
};

export default DeparturesList;
