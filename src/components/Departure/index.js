import React from 'react';

import styles from './styles.scss';

const Departure = ({
  departure_time,
  arrival_time,
  originName,
  destinationName,
  prices: { total },
  links: { deeplink },
  operator,
}) => (
  <div className={styles.departure}>
    <div className={styles.info}>
      <div><strong>Departure time:</strong> {new Date(departure_time).toLocaleTimeString()}</div>
      <div><strong>Arrival time:</strong> {new Date(arrival_time).toLocaleTimeString()}</div>
      <div><strong>Start location:</strong> {originName}</div>
      <div><strong>End location:</strong> {destinationName}</div>
      <div><strong>Price:</strong> {'$' + (total / 100).toFixed(2)}</div>
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

export default Departure;
