import React, { PropTypes } from 'react';

import styles from './styles.scss';

import Departure from '../Departure';

const Departures = ({
  origin,
  destination,
  date,
  adultCount,
  departures,
  allDeparturesFetched,
  fetchNextBatch,
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
      {departures.map((departure, i) => <Departure key={i} {...departure} />)}
    </div>
    {departures.length && (
      <button onClick={fetchNextBatch}>Get More Departures</button>
    )}
  </div>
);

Departures.propTypes = {
  origin: React.PropTypes.object,
  destination: React.PropTypes.object,
  date: React.PropTypes.string,
  adultCount: React.PropTypes.number,
  departures: React.PropTypes.array,
  allDeparturesFetched: React.PropTypes.bool,
  fetchNextBatch: React.PropTypes.func,
};

export default Departures;
