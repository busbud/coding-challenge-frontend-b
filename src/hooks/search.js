import { useEffect, useState, useCallback, useRef } from 'react';

import useApi from './api';

const useSearch = ({ url, baseParams, serachField = 'departures' }) => {
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState(false);

  const indexRef = useRef(0);
  const dataRef = useRef([]);

  const { sendRequest, clear, data, error } = useApi();

  const initialSearchHandler = useCallback(() => {
    setLoading(true);
    indexRef.current = 0;
    dataRef.current = [];
    sendRequest(url, 'GET', process.env.React_APP_TOKEN, baseParams);
  }, [baseParams, sendRequest]);

  const pollSearchHandler = useCallback(() => {
    const pollUrl = `${url}/poll`;
    const pollParams = { ...baseParams, index: indexRef.current };
    sendRequest(pollUrl, 'GET', process.env.React_APP_TOKEN, pollParams);
  }, [baseParams, sendRequest]);

  useEffect(() => {
    if (error) {
      setLoading(false);
      setSearchError(error);
      clear();
    } else if (data) {
      indexRef.current = indexRef.current + data[serachField].length;
      dataRef.current.push(...data[serachField]);

      if (data.complete) {
        setLoading(false);
        clear();
      } else {
        clear();
        pollSearchHandler();
      }
    }
  }, [data, error, pollSearchHandler, clear]);

  return {
    searchHandler: initialSearchHandler,
    result: loading ? null : dataRef.current,
    loading,
    error: searchError,
  };
};

export default useSearch;
