import { useEffect, useState, useCallback, useRef } from 'react';

import { getDeparturesData } from '../utils/utils';
import useApi from './api';

const useSearch = ({ url, baseParams }) => {
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [result, setResult] = useState(null);

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
      const dparturesData = getDeparturesData(data);
      indexRef.current = indexRef.current + dparturesData.length;
      dataRef.current.push(...dparturesData);

      if (data.complete) {
        setResult(dparturesData);
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
    result,
    loading,
    error: searchError,
  };
};

export default useSearch;
