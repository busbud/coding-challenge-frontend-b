import Core from './core';
import _ from 'lodash';
import moment from 'moment';

export default class Search extends Core {
  constructor(origin, destination, outboundDate, params) {
    super();

    this.searchUrl = `${origin}/${destination}/${outboundDate}`;
    this.params = {currency: 'CAD', ...params};
  }

  async intialSearch(params = {}) {
    const data = await this.get(`/x-departures/${this.searchUrl}`, {...this.params, ...params});

    return toResults(data, params);
  }

  async pollSearch(params = {}) {
    const data = await this.get(`/x-departures/${this.searchUrl}/poll`, {...this.params, ...params});

    return toResults(data, params);
  }

}
/* eslint camelcase: "warn"*/
export function toResults({departures, locations, complete}, {language = 'en'}) {

  moment.locale(language);

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

    const momentDepart = moment(departure_time);
    const momentArrival = moment(arrival_time);

    const departureTime = momentDepart.format('ddd, MMM, h:mm a');
    const arrivalTime = momentArrival.format('ddd, MMM, h:mm a');

    const price = _.get(prices, 'total');
    const currency = _.get(prices, 'currency');

    return {
      id: busbud_departure_id,
      originLocName,
      currency,
      destLocName,
      departureTime,
      arrivalTime,
      price
    };

  });

  return {results, complete};
}
