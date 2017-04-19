import React, { PropTypes } from 'react';
import moment from 'moment';

import styles from './styles.scss';

import Departure from '../Departure';
import LoadingText from '../LoadingText';

const formatDate = dateTimeString => moment(
  new Date(dateTimeString).toISOString()
).format('D MMM YYYY');

const Departures = ({
  origin,
  destination,
  date,
  adultCount,
  currency,
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
      <span className={styles.data}>{formatDate(date)}</span>{' '}
    </div>
    <div className={styles.departures}>
      {departures.map(departure =>
        <Departure
          {...departure}
          key={departure.id}
          originName={origin.name}
          destinationName={destination.name}
          currency={currency}
        />
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
  currency: React.PropTypes.string,
  departures: React.PropTypes.array,
  complete: React.PropTypes.bool,
};

export default Departures;
