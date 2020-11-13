import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { params } from '../../utils/constants';
import CurrencyContext from '../../contexts/currencyContext';
import useSearchDepartures from '../../hooks/searchDepartures';
import Spinner from '../shared/Spinner/Spinner';
import DeparturesList from './DeparturesList/DeparturesList';
import styles from './Book.module.scss';

const Book = (props) => {
  const { t, i18n } = useTranslation();
  const { currency } = useContext(CurrencyContext);
  const [departureData, setDepartureData] = useState([]);

  const baseQueryString = useMemo(
    () => ({ adult: 1, currency, lang: i18n.language }),
    [currency, i18n.language]
  );

  const { searchHandler, result, loading, error } = useSearchDepartures({
    params,
    baseQueryString,
  });

  useEffect(() => {
    if (error) {
      alert('ERROR IN GETTING DEPARTUES!');
    } else if (result) {
      setDepartureData(result);
    }
  }, [result, error]);

  return (
    <div className={styles.container}>
      <div className={styles.btnContainer}>
        <button className={styles.btn} onClick={() => searchHandler()}>
          {t('book.search')}
        </button>
      </div>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <DeparturesList departures={departureData} />
      )}
    </div>
  );
};

export default Book;
