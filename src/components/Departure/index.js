import React from 'react';
import moment from 'moment';

import styles from './styles.scss';

const formatTime = dateTimeString => moment(
  new Date(dateTimeString).toISOString()
).format('h:mm a');

const Departure = ({
  departure_time,
  arrival_time,
  originName,
  destinationName,
  prices: { total },
  links: { deeplink },
  operator,
  currency,
}) => (
  <div className={styles.departure}>
    <div className={styles.info}>
      <div><strong>Departure time:</strong> {formatTime(departure_time)}</div>
      <div><strong>Arrival time:</strong> {formatTime(arrival_time)}</div>
      <div><strong>Start location:</strong> {originName}</div>
      <div><strong>End location:</strong> {destinationName}</div>
      <div><strong>Price:</strong>${(total / 100).toFixed(2)} {currency}</div>
      {deeplink && <div><a href={deeplink}>Book now</a></div>}
    </div>
    <div className={styles.operatorDetails}>
      <div>
        <a href={operator.url}>
          <img src={operator.logo_url} alt={operator.display_name} />
        </a>
      </div>
      <a href={operator.url}>{operator.display_url}</a>
    </div>
  </div>
);

Departure.propTypes = {
  departure_time: React.PropTypes.string,
  arrival_time: React.PropTypes.string,
  originName: React.PropTypes.string,
  destinationName: React.PropTypes.string,
  prices: React.PropTypes.object,
  links: React.PropTypes.object,
  operator: React.PropTypes.object,
  currency: React.PropTypes.string,
};

export default Departure;
