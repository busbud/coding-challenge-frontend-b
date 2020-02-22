import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { SearchApi } from '../services/search-api';

const POLLING_INTERVAL = 3000;

export function useSearch() {
  const [userSearch, setUserSearch] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const intervalRef = useRef(null);
  const cancelToken = useRef(null);
  const previousResponses = useRef([]);

  useEffect(() => {
    if (!userSearch) {
      return;
    }

    const handleHttpRequestError = err => {
      if (!axios.isCancel(err)) {
        console.log(err);
        setError('An error occured, please try again');
        setLoading(false);
        stopOngoingSearch();
      }
    };

    /**
     * Stop interval poll and cancel any pending requests
     */
    const stopOngoingSearch = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      if (cancelToken.current) {
        cancelToken.current.cancel();
      }
    };

    const _updateData = response => {
      if (response.data.complete) {
        stopOngoingSearch();
        setLoading(false);
      }

      if (response.data.formattedData) {
        const newResponses = [
          ...previousResponses.current,
          ...response.data.formattedData
        ];
        previousResponses.current = newResponses;
        setData(newResponses);
      }
      return response;
    };

    const _startPollingData = () => {
      intervalRef.current = setInterval(() => {
        SearchApi.poll({
          ...userSearch,
          offset: previousResponses.current.length,
          cancelToken: cancelToken.current.token
        })
          .then(_updateData)
          .catch(handleHttpRequestError);
      }, POLLING_INTERVAL);
    };

    setLoading(true);
    setError('');
    previousResponses.current = [];
    cancelToken.current = axios.CancelToken.source();
    SearchApi.initiate({
      ...userSearch,
      cancelToken: cancelToken.current.token
    })
      .then(_updateData)
      .then(res => {
        if (!res.data.complete) {
          _startPollingData();
        }
      })
      .catch(handleHttpRequestError);

    return () => stopOngoingSearch();
  }, [userSearch]);

  const search = date => {
    setUserSearch({
      origin: 'dr5reg',
      destination: 'f25dvk',
      nbAdults: 1,
      date
    });
  };

  return { data, loading, error, search };
}
