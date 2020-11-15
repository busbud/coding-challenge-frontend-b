import {
  callApi,
  TCallApiRequest,
  TWhitelistedEndpoints,
} from "./apiCoreScripts";
import { getCustomHeaders } from "./getCustomHeaders";

type TPerformPollRequest = {
  endpoint: TWhitelistedEndpoints;
  index: number;
  queryParams: TCallApiRequest["queryParams"];
  successCallback: (data: any) => void;
  urlParams: TCallApiRequest["urlParams"];
};

const FALLBACK_TIMEOUT = 5000;

export const performPoll = async (
  request: TPerformPollRequest
): Promise<any> => {
  const { endpoint, index, queryParams, successCallback, urlParams } = request;
  // dupe the query params (to ensure we don't add multiple `index` keys)
  // and add in the index to query from.
  const query = (queryParams || []).slice(0);
  query.push(["index", index]);
  const response = await callApi({
    endpoint,
    getCustomHeaders,
    method: "GET",
    queryParams: query,
    urlParams,
  });

  const pollTimeout = process.env.REACT_APP_BUSBUS_API_POLL_FREQUENCY
    ? parseInt(process.env.REACT_APP_BUSBUS_API_POLL_FREQUENCY, 10)
    : FALLBACK_TIMEOUT;
  if (!response.complete) {
    // eslint-disable-next-line
    console.log("polling", response);
    setTimeout(() => {
      const nextIndex = index + response.departures.length;
      performPoll({ ...request, index: nextIndex });
    }, pollTimeout);
    return null;
  }
  successCallback(response);
  return response;
};
