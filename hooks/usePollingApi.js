import React, { useState, useEffect } from "react";

import { getApi, createUrl } from "../utils/api";

export default function usePollingApi(
  urlParams = "",
  queryParams = "",
  bakeResult,
  baseUrl = "https://napi.busbud.com/x-departures/"
) {
  const [results, setResult] = useState({});
  const [called, callAgain] = useState(0);
  const [isLoading, setLoading] = useState(true);

  async function handleStatusChange() {
    // genarate url based on we are polling or first time call
    let apiUrl;
    if (called > 0) {
      urlParams.push("poll");
      queryParams.push(
        "index=" + (results.departures && results.departures.length) || 0
      );
      apiUrl = createUrl(baseUrl, urlParams, queryParams);
    } else {
      apiUrl = createUrl(baseUrl, urlParams, queryParams);
    }
    let response = apiUrl && (await getApi(apiUrl));
    // manipulate result as required by component
    // we need to do it here as we need to pass index
    setResult(bakeResult(results, response));
    if (response && !response.complete) {
      setTimeout(() => callAgain(called + 1), 2000);
    } else {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleStatusChange();
  }, [called]);
  return { results, isLoading };
}
