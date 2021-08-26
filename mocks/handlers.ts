// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

import { serverRuntimeConfig } from 'configs/envs';

const searchResponse = {
  cities: [{
    id: '375dd587-9001-acbd-84a4-683deddcb1b1',
    name: 'Quebec City',
  }, {
    id: '375dd587-9001-acbd-84a4-683dedfb933e',
    name: 'Montreal',
  }],
  locations: [{
    id: 1938,
    city_id: '375dd587-9001-acbd-84a4-683dedfb933e',
    name: "Gare d'autocars",
  }, {
    id: 12189,
    city_id: '375dd587-9001-acbd-84a4-683deddcb1b1',
    name: 'Gare du Palais',
  }],
  operators: [{
    id: 'a7ad22de-ad5b-4408-abce-ded634595698',
    logo_url: 'https://busbud.imgix.net/operator-logos/logo_orleans-express.png.png?h={height}&w={width}&auto=format&fit=fill&bg=0FFF',
    display_name: 'Orléans Express',
  }],
  departures: [{
    id: 'ODIwOGU1MGM6MTMwMjE0YTM',
    links: {
      deeplink: 'https://www.busbud.com/en/deeplink/f2m673/f25dvk/ODIwOGU1MGM6MTMwMjE0YTM?outbound_date=2021-09-02&return_date&adults=1&children=0&seniors=0&child_ages=&senior_ages=&discount_code&utm_source={utm_source}&utm_campaign={utm_campaign}&utm_medium={utm_medium}',
    },
    operator_id: 'a7ad22de-ad5b-4408-abce-ded634595698',
    origin_location_id: 12189,
    departure_time: '2021-09-02T09:30:00',
    destination_location_id: 1938,
    arrival_time: '2021-09-02T12:45:00',
    prices: {
      currency: 'USD',
      breakdown: {
        base: 4778,
      },
    },
  }],
  origin_city_id: '375dd587-9001-acbd-84a4-683deddcb1b1',
  destination_city_id: '375dd587-9001-acbd-84a4-683dedfb933e',
  complete: false,
};

const searchPollResponse = {
  departures: [{
    id: 'NTBhMDdlOWQ6MzQxYmYyNjg',
    links: {
      deeplink: 'https://www.busbud.com/en/deeplink/f2m673/f25dvk/NTBhMDdlOWQ6MzQxYmYyNjg?outbound_date=2021-09-02&return_date&adults=1&children=0&seniors=0&child_ages=&senior_ages=&discount_code&utm_source={utm_source}&utm_campaign={utm_campaign}&utm_medium={utm_medium}',
    },
    operator_id: 'a7ad22de-ad5b-4408-abce-ded634595698',
    origin_location_id: 12189,
    departure_time: '2021-09-02T10:30:00',
    destination_location_id: 1938,
    arrival_time: '2021-09-02T14:15:00',
    prices: {
      currency: 'USD',
      breakdown: {
        base: 4778,
      },
    },
  }],
  origin_city_id: '375dd587-9001-acbd-84a4-683deddcb1b1',
  destination_city_id: '375dd587-9001-acbd-84a4-683dedfb933e',
  complete: true,
};

export const handlers = [
  rest.get(`${serverRuntimeConfig.API_URL}/x-departures/*/poll`,
    (req, res, ctx) => res(
      ctx.json(searchPollResponse),
    )),

  rest.get(`${serverRuntimeConfig.API_URL}/x-departures/*`,
    (req, res, ctx) => res(
      ctx.json(searchResponse),
    )),
];
