import React, { useContext } from 'react';
import PropTypes, { object } from 'prop-types';
import { useTranslation } from 'react-i18next';

import CurrencyContext from '../../../contexts/currencyContext';
import Card from '../../shared/Card/Card';
import styles from './DeparturesList.module.scss';

const DeparturesList = (props) => {
  const { departures } = props;
  const { t } = useTranslation();
  const { currency } = useContext(CurrencyContext);

  if (!departures?.length) return null;

  return (
    <div className={styles.container}>
      {departures.map((departure) => (
        <Card key={departure.id}>
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
          </div>
        </Card>
      ))}
    </div>
  );
};

DeparturesList.propTypes = {
  departures: PropTypes.arrayOf(object),
};

export default DeparturesList;
