import { useEffect, useState, useCallback, useRef, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import CurrencyContext from '../contexts/currencyContext';
import { getDeparturesData } from '../utils/utils';
import useApi from './api';
import { baseUrl, headers } from '../utils/constants';

// custome hook for handle departure search
const useSearchDeparture = ({ params = {}, baseQueryString = {} }) => {
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [result, setResult] = useState(null);

  const { sendRequest, clear, data, error } = useApi();

  const { i18n } = useTranslation();
  const { currency } = useContext(CurrencyContext);

  // accumulate index with no extra rendering
  const indexRef = useRef(0);

  // accumulate mapDepartures with no extra rendering
  const departuresRef = useRef([]);

  const initialSearchHandler = useCallback(
    (isPoll) => {
      const { origin, destination, outbound_date } = params;
      let url = `${baseUrl}/${origin}/${destination}/${outbound_date}`;

      if (!isPoll) {
        // initial search
        setLoading(true);
        indexRef.current = 0;
        departuresRef.current = [];
      } else {
        // Poll search
        url = `${url}/poll`;
        baseQueryString = { ...baseQueryString, index: indexRef.current };
      }

      sendRequest(url, 'GET', baseQueryString, headers);
    },
    [baseQueryString, sendRequest]
  );

  // update data if its already fetched and language or currency have changed
  useEffect(() => {
    if (departuresRef.current?.length) {
      initialSearchHandler();
    }
  }, [currency, i18n.language]);

  useEffect(() => {
    if (error) {
      setLoading(false);
      setSearchError(error);
      clear();
    } else if (data) {
      const mapDepartures = getDeparturesData(data);
      indexRef.current = indexRef.current + mapDepartures.length;
      departuresRef.current.push(...mapDepartures);

      if (data.complete) {
        setResult(mapDepartures);
        setLoading(false);
        clear();
      } else {
        clear();
        initialSearchHandler(true);
      }
    }
  }, [data, error, initialSearchHandler, clear]);

  return {
    searchHandler: initialSearchHandler,
    result,
    loading,
    error: searchError,
  };
};

export default useSearchDeparture;
