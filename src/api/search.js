import Core from './core';
import _ from 'lodash';

export default class Search extends Core {
  constructor(origin, destination, outboundDate, params) {
    super();

    this.searchUrl = `${origin}/${destination}/${outboundDate}`;
    this.params = {currency: 'CAD', ...params};
  }

  async intialSearch() {
    const data = await this.get(`/x-departures/${this.searchUrl}`, this.params);

    return toResults(data);
  }

  async pollSearch(index) {
    const data = await this.get(`/x-departures/${this.searchUrl}/poll`, {...this.params, index});

    return toResults(data);
  }

}
/* eslint camelcase: "warn"*/
function toResults({departures, locations, complete}) {
  const results = _.map(departures, ({
    busbud_departure_id,
    prices,
    origin_location_id,
    destination_location_id,
    departure_time, arrival_time}) => {
    const originalLocation = _.find(locations, loc => loc.id === origin_location_id);
    const destionationLocation = _.find(locations, loc => loc.id === destination_location_id);

    const originLocName = _.get(originalLocation, 'name');
    const destLocName = _.get(destionationLocation, 'name');

    // timezone
    const departureTime = departure_time ? new Date(departure_time).toDateString() : '';
    const arrivalTime = arrival_time ? new Date(arrival_time).toDateString() : '';

    const price = _.get(prices, 'total');

    return {
      id: busbud_departure_id,
      originLocName,
      destLocName,
      departureTime,
      arrivalTime,
      price
    };

  });

  return {results, complete};
}
