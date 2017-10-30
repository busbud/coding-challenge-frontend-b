export const FETCH_TRIPS = 'FETCH_TRIPS';
export const FETCH_TRIPS_SUCCESS = 'FETCH_TRIPS_SUCCESS';
export const FETCH_TRIPS_ERROR = 'FETCH_TRIPS_ERROR';

const NEW_YORK_GEOHASH = 'dr5reg';
const MONTREAL_GEOHASH = 'f25dvk';
const OUTBOUND_DATE = '2018-08-02';

export const fetchTrips = () => ({
  type: FETCH_TRIPS,
  origin: NEW_YORK_GEOHASH,
  destination: MONTREAL_GEOHASH,
  outboundDate: OUTBOUND_DATE
});
export const fetchTripsSuccess = apiResponse => ({
  type: FETCH_TRIPS_SUCCESS,
  apiResponse
});
export const fetchTripsError = () => ({ type: FETCH_TRIPS_ERROR });
