import Core from './core';
import _ from 'lodash';
import moment from 'moment';
import {languages} from '../config';

export default class Search extends Core {
  constructor(origin, destination, outboundDate, params = {}) {
    super();

    this.searchUrl = `${origin}/${destination}/${outboundDate}`;
    this.params = params;
  }

  async intialSearch(params = {}) {
    const data = await this.get(`/x-departures/${this.searchUrl}`, {...this.params, ...getCurrency(params)});

    return toResults(data, params);
  }

  async pollSearch(params = {}) {
    const data = await this.get(`/x-departures/${this.searchUrl}/poll`, {...this.params, ...getCurrency(params)});

    return toResults(data, params);
  }

}

function getCurrency(param) {
  if (!param.lang || param.currency) {
    return param;
  }



  const language = languages.find(lang => lang.value === param.lang);

  if (!language) {
    return param;
  }


  return {...param, currency: language.currency};

}

/* eslint camelcase: "warn"*/
export function toResults({departures, locations, complete}, {lang = 'en'}) {

  moment.locale(lang);

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

    const price = (_.get(prices, 'total', 0) / 1000).toFixed(2);
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
