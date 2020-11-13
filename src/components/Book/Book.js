import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { params } from '../../utils/constants';
import CurrencyContext from '../../contexts/currencyContext';
import useSearchDepartures from '../../hooks/searchDepartures';
import Spinner from '../shared/Spinner/Spinner';
import DeparturesList from './DeparturesList/DeparturesList';
import styles from './Book.module.scss';

const Book = (props) => {
  const { t, i18n } = useTranslation();
  const { currency } = useContext(CurrencyContext);
  const baseQueryString = useMemo(
    () => ({ adult: 1, currency, lang: i18n.language }),
    [currency, i18n.language]
  );
  // In real app adult in params and baseQueryString comes from inputs
  const { searchHandler } = useSearchDepartures({ params, baseQueryString });

  const { loading, departures, error } = useSelector(({ data }) => data);

  useEffect(() => {
    if (error) {
      alert('ERROR IN GETTING DEPARTUES!');
    }
  }, [error]);

  return (
    <div className={styles.container}>
      <div className={styles.btnContainer}>
        <button className={styles.btn} onClick={() => searchHandler()}>
          {t('book.search')}
        </button>
      </div>
      {loading ? (
        <Spinner loading={loading} />
      ) : departures ? (
        <DeparturesList departures={departures} />
      ) : null}
    </div>
  );
};

export default Book;
