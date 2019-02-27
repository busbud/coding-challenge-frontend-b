import React from 'react';

import styles from './Onboarding.module.css';

export const Onboarding = ({ originCity, destinationCity, departureDate }) => {
  return (
    <section className={styles.onboarding} data-testid="onboarding">
      <div>
        <h1>{`${originCity.name} - ${destinationCity.name}`}</h1>
        <p className={styles['onboarding-date']}>
          <b>{departureDate}</b>
        </p>
      </div>
      <button className={styles.button} type="button">
        Search
      </button>
    </section>
  );
};
