import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { POLL_TRIPS, pollTripsError, pollTripsSuccess } from '../actions/index';

const busbudApiToken = process.env.REACT_APP_BUSBUD_API_TOKEN;

const pollTripsEpic = (
  action$,
  store,
  { ajax, delayBetweenPollsInMs = 3000 }
) => {
  return (
    action$
      .ofType(POLL_TRIPS)
      // Wait a bit before polling new trips so the server can gather data from bus companies.
      .delay(delayBetweenPollsInMs)
      .mergeMap(action => pollTrips(action, ajax))
  );
};

export default pollTripsEpic;

function pollTrips(action, ajax) {
  const {
    origin,
    destination,
    outboundDate,
    numberOfAdults,
    currency,
    lang,
    index
  } = action;

  return ajax({
    url: `https://napi.busbud.com/x-departures/${origin}/${destination}/${outboundDate}/poll`,
    headers: {
      Accept:
        'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
      'X-Busbud-Token': busbudApiToken
    },
    body: {
      adult: numberOfAdults,
      lang,
      currency,
      index
    },
    responseType: 'json'
  })
    .map(({ response }) => pollTripsSuccess(response))
    .catch(() => Observable.of(pollTripsError()));
}
