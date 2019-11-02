import React, { useState, useEffect } from "react";

import { getApi } from "../utils/api";

export default function useFetchSchedules(
  originHash,
  destinationHash,
  date,
  noOfAdults
) {
  const [departures, setDepartures] = useState([]);
  const [called, callAgain] = useState(0);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function handleStatusChange() {
      let baseUrl =
        "https://napi.busbud.com/x-departures/" +
        originHash +
        "/" +
        destinationHash +
        "/" +
        date;
      let queryParams = "?adult=" + noOfAdults;
      if (called > 0) {
        baseUrl += "/poll";
        queryParams += "&index=" + departures.length;
      }
      console.log(baseUrl + queryParams);
      let response = await getApi(baseUrl + queryParams);
      console.log(response);
      setDepartures(departures.concat(response.departures));
      if (!response.complete) {
        setTimeout(() => callAgain(called + 1), 2000);
      } else {
        setLoading(false);
      }
    }
    handleStatusChange();
  }, [called]);
  return { departures, isLoading };
}
