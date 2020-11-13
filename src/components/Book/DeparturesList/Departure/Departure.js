import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import CurrencyContext from '../../../../contexts/currencyContext';
import styles from './Departure.module.scss';

const Departure = (props) => {
  const { departure } = props;
  const { currency } = useContext(CurrencyContext);
  const { t } = useTranslation();

  return (
    <div className={styles.row}>
      <div className={styles.col}>
        <h5>{`${t('departure.dTime')}:`}</h5>
        &nbsp;{`${departure.dTime}`}
      </div>
      <div className={styles.col}>
        <h5>{`${t('departure.aTime')}:`}</h5>
        &nbsp;{`${departure.aTime}`}
      </div>
      <div className={styles.col}>
        <h5>{`${t('departure.location')}:`}</h5>
        &nbsp;{`${departure.location}`}
      </div>
      <div className={styles.col}>
        <h5>{`${t('departure.price')}:`}</h5>
        &nbsp;{`${departure.price} ${currency}`}
      </div>
      <div className={styles.col}>
        <a href={departure.link}>{`${t('departure.buy')}`}</a>
      </div>
    </div>
  );
};

Departure.propTypes = {
  departure: PropTypes.object,
};

export default Departure;
