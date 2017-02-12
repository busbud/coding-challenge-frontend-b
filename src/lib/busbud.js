import Rx from 'rx';
import pathToRegexp from 'path-to-regexp';
import qs from 'qs';

const POLL_DELAY = 1000;
const BUSBUD_TOKEN = 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A';
const BUSBUD_HEADERS = {
  Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
  'x-busbud-token': BUSBUD_TOKEN,
};

const departuresPath = pathToRegexp.compile(
  'https://napi.busbud.com/x-departures/:origin/:destination/:outbound_date\\?',
);
const departuresPollPath = pathToRegexp.compile(
  'https://napi.busbud.com/x-departures/:origin/:destination/:outbound_date/poll\\?',
);

/**
 * Parses a Response object, and returns the JSON content.
 *
 * @param {Response} response Response object
 *
 * @return {Object} JSON parsed content of the response
 * @throw {Error} On HTTP error status
 */
function parseResponse(response) {
  if (response.status < 200 || response.status >= 300) {
    throw new Error(response.statusText);
  }

  return response.json();
}

/**
 * Fetch and poll departures, and returns an observable
 *
 * @param {Object} options
 * @param {String} options.origin
 * @param {String} options.destination
 * @param {String} options.outbound_date
 * @param {Number} options.adult
 * @param {Number} options.child
 * @param {Number} options.senior
 * @param {String} options.lang
 * @param {String} options.currency
 *
 * @return {Rx.Observable}
 */
export function fetchDepartures({
  origin,
  destination,
  outbound_date,
  adult,
  child,
  senior,
  lang,
  currency,
}) {
  return Rx.Observable

    // Create the Observable with the fetch's promise
    .fromPromise(fetch(
      departuresPath({
        origin,
        destination,
        outbound_date,
      }) + qs.stringify({
        adult,
        child,
        senior,
        lang,
        currency,
      }), {
        headers: BUSBUD_HEADERS,
      })
      // Parse response to catch HTTP errors
      .then(parseResponse)
    )

    // Once completed, continue polling if needed
    .flatMap((response) => {
      // Keep track of the index
      let departureIndex = response.departures.length;
      // Keep track of global status
      let requestCompleted = response.complete;

      // Create the observable that will poll the Api
      const pollObservable = Rx.Observable

        // Poll while the request is not completed
        .while(() => (
          !requestCompleted
        ),
          Rx.Observable

          // Create the observable with the fetch's promise
          .fromPromise(() => (
            fetch(departuresPollPath({
              origin,
              destination,
              outbound_date,
            }) + qs.stringify({
              adult,
              child,
              senior,
              lang,
              currency,
              index: departureIndex,
            }), {
              headers: BUSBUD_HEADERS,
            })
            .then(parseResponse)
          ))

          // After each poll, increment index, and update status
          .do((poll) => {
            departureIndex += poll.departures.length;
            requestCompleted = poll.complete;
          })

          // Keep a delay between each poll request
          .delay(POLL_DELAY)
        );

      // Merge first response with poll observable
      return Rx.Observable
        .of(response)
        .merge(pollObservable);
    })
  ;
}
