export const GO_TO_ONBOARDING = 'GO_TO_ONBOARDING';

export const goToOnboarding = () => ({ type: GO_TO_ONBOARDING });

export const FETCH_TRIPS = 'FETCH_TRIPS';
export const FETCH_TRIPS_SUCCESS = 'FETCH_TRIPS_SUCCESS';
export const FETCH_TRIPS_ERROR = 'FETCH_TRIPS_ERROR';

// These are constants but could be actual variables in our system.
// It would be easy to make the app grow in complexity.
const NEW_YORK_GEOHASH = 'dr5reg';
const MONTREAL_GEOHASH = 'f25dvk';
const OUTBOUND_DATE = '2018-08-02';
const NUMBER_OF_ADULTS = 1;
const LANG = 'CA';
const CURRENCY = 'CAD';

export const fetchTrips = () => ({
  type: FETCH_TRIPS,
  origin: NEW_YORK_GEOHASH,
  destination: MONTREAL_GEOHASH,
  outboundDate: OUTBOUND_DATE,
  numberOfAdults: NUMBER_OF_ADULTS,
  lang: LANG,
  currency: CURRENCY
});

export const fetchTripsSuccess = apiResponse => ({
  type: FETCH_TRIPS_SUCCESS,
  apiResponse
});

export const fetchTripsError = () => ({ type: FETCH_TRIPS_ERROR });

export const POLL_TRIPS = 'POLL_TRIPS';
export const POLL_TRIPS_SUCCESS = 'POLL_TRIPS_SUCCESS';
export const POLL_TRIPS_ERROR = 'POLL_TRIPS_ERROR';

export const pollTrips = index => ({
  type: POLL_TRIPS,
  origin: NEW_YORK_GEOHASH,
  destination: MONTREAL_GEOHASH,
  outboundDate: OUTBOUND_DATE,
  numberOfAdults: NUMBER_OF_ADULTS,
  lang: LANG,
  currency: CURRENCY,
  index
});

export const pollTripsSuccess = apiResponse => ({
  type: POLL_TRIPS_SUCCESS,
  apiResponse
});

export const pollTripsError = () => ({ type: POLL_TRIPS_ERROR });
