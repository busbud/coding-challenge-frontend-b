import axios from 'axios';
import retry from 'retry';

const GET_METHOD = 'get';
const MAX_RETRIES = 15;
const TIME_BETWEEN_TRIES_IN_MS = 1500;

const authToken = process.env.AUTH_TOKEN;

const call = (url) => {
  const headers = {
    Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
    'X-Busbud-Token': authToken,
  };

  return axios({
    method: GET_METHOD,
    url,
    headers,
  }).then(({ data }) => data);
};

export const searchDepartures = (parameters) => {
  const {
    origin,
    destination,
    outboundDate,
    language,
  } = parameters;
  const searchDeparturesUrl = `https://napi.busbud.com/x-departures/${origin}/${destination}/${outboundDate}?adult=1&lang=${language}`;

  const operation = retry.operation({
    retries: MAX_RETRIES,
    factor: 1.1,
    minTimeout: TIME_BETWEEN_TRIES_IN_MS,
  });

  return new Promise((resolve, reject) => {
    operation.attempt(() => {
      call(searchDeparturesUrl)
        .then((result) => {
          if (!result.complete) {
            operation.retry(true);
            return;
          }

          resolve(result);
        })
        .catch((error) => {
          operation.stop();
          reject(error);
        });
    });
  });
};

export default searchDepartures;
