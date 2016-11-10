import React, { PropTypes } from 'react';

import styles from './styles.scss';

import Departure from '../Departure';
import LoadingText from '../LoadingText';

const Departures = ({
  origin,
  destination,
  date,
  adultCount,
  departures,
  complete,
}) => (
  <div>
    <div className={styles.subheading}>
      Departures from{' '}
      <span className={styles.data}>{origin.name}</span>{' '}
      to{' '}
      <span className={styles.data}>{destination.name}</span>{' '}
      for{' '}
      <span className={styles.data}>{`${adultCount} adult`}</span>{' '}
      on{' '}
      <span className={styles.data}>{new Date(date).toLocaleDateString()}</span>{' '}
    </div>
    <div className={styles.departures}>
      {departures.map(departure =>
        <Departure key={departure.id} {...departure} />
      )}
    </div>
    {!complete && <LoadingText />}
  </div>
);

Departures.propTypes = {
  origin: React.PropTypes.object,
  destination: React.PropTypes.object,
  date: React.PropTypes.string,
  adultCount: React.PropTypes.number,
  departures: React.PropTypes.array,
  complete: React.PropTypes.bool,
};

export default Departures;
