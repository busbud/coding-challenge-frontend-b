import React, { useEffect, useState } from 'react';
import { fetchTickets } from '../api/busbud';

function withBusBudData(Comp) {
  const CompWrapper = (props: Props) => {
    const [busBudData, setBusbudData] = useState({
      isFetching: true,
      data: null,
      error: null,
    });


    useEffect(() => {
      fetchTickets()
        .then((res) => res.json())
        .then((res) => setBusbudData({
          isFetching: false,
          data: res,
          error: null,
        }))
        .catch((err) => setBusbudData({
          isFetching: false,
          data: null,
          error: err,
        }));
    }, []); //eslint-disable-line

    function handleSubmit(e) {
      const origin = e.from.geohash;
      const destination = e.to.geohash;
      const outBoundDate = e.date;
      const { adult } = e;
      setBusbudData({
        isFetching: true,
        data: null,
        error: null,
      });
      fetchTickets(origin, destination, outBoundDate, adult)
        .then((res) => res.json())
        .then((res) => setBusbudData({
          isFetching: false,
          data: res,
          error: null,
        }))
        .catch((err) => setBusbudData({
          isFetching: false,
          data: null,
          error: err,
        }));
    }

    return (
      <Comp
        {...props}
        onSubmit={(e) => handleSubmit(e)}
        busBudData={busBudData}
      />
    );
  };
  return CompWrapper;
}

export default withBusBudData;
