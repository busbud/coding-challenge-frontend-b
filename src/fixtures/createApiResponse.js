export default () => ({
  origin_city_id: '375dd587-9001-acbd-84a4-683deda84183',
  destination_city_id: '375dd587-9001-acbd-84a4-683dedfb933e',
  cities: [
    {
      id: '375dd587-9001-acbd-84a4-683deda84183',
      region_id: 6417,
      name: 'New York',
      lat: 40.71427,
      lon: -74.00597,
      geohash: 'dr5reg',
      timezone: 'America/New_York',
      image_url:
        'https://busbud.imgix.net/city-hires/1474307214322-NewYork,NewYork,UnitedStates.jpg?h={height}&w={width}&auto=format,compress',
      hero_image_url:
        'https://busbud.imgix.net/city-heroes/newyork.jpg?h={height}&w={width}&auto=format',
      legacy_url_form: 'NewYork,NewYork,UnitedStates',
      country_code2: 'US',
      full_name: 'New York, New York, United States',
      locale: 'en',
      region: {
        id: 6417,
        region_code: 'NY',
        country_code2: 'US',
        name: 'New York',
        locale: 'en',
        country: {
          code2: 'US',
          code3: 'USA',
          name: 'United States',
          continent: 'NA',
          default_locale: 'en',
          default_currency: 'USD',
          population: 310232863,
          locale: 'en'
        }
      }
    },
    {
      id: '375dd587-9001-acbd-84a4-683dedfb933e',
      region_id: 3361,
      name: 'Montreal',
      lat: 45.50884,
      lon: -73.58781,
      geohash: 'f25dvk',
      timezone: 'America/Montreal',
      image_url:
        'https://busbud.imgix.net/city-hires/1474307214311-Montreal,Quebec,Canada.jpg?h={height}&w={width}&auto=format,compress',
      hero_image_url:
        'https://busbud.imgix.net/city-heroes/montreal.jpg?h={height}&w={width}&auto=format',
      legacy_url_form: 'Montreal,Quebec,Canada',
      country_code2: 'CA',
      full_name: 'Montreal, Quebec, Canada',
      locale: 'en',
      region: {
        id: 3361,
        region_code: 'QC',
        country_code2: 'CA',
        name: 'Quebec',
        locale: 'en',
        country: {
          code2: 'CA',
          code3: 'CAN',
          name: 'Canada',
          continent: 'NA',
          default_locale: 'en',
          default_currency: 'CAD',
          population: 33679000,
          locale: 'en'
        }
      }
    }
  ],
  locations: [
    {
      id: 24010,
      city_id: '375dd587-9001-acbd-84a4-683deda84183',
      name: '34th St & 9th Ave',
      address: ['367 W 34th St', 'New York', 'NY 10001, USA'],
      type: 'bus_stop',
      lat: 40.7533974783186,
      lon: -73.9958676695824,
      geohash: 'dr5ru4vve'
    },
    {
      id: 17508,
      city_id: '375dd587-9001-acbd-84a4-683dedfb933e',
      name: 'Saint-Denis & Saint-Joseph',
      address: [
        '389 Boulevard Saint-Joseph Est',
        'Montréal, QC H2T 1J5',
        'Canada'
      ],
      type: 'bus_stop',
      lat: 45.5262379894414,
      lon: -73.5881536441803,
      geohash: 'f25dvry9x'
    },
    {
      id: 25179,
      city_id: '375dd587-9001-acbd-84a4-683dedfb933e',
      name: 'Métro Radisson',
      address: ['7200 Rue Sherbrooke E', 'Montréal, QC H1N 1E7', 'Canada'],
      type: 'bus_stop',
      lat: 45.5888,
      lon: -73.53948,
      geohash: 'f25eqe4nj'
    },
    {
      id: 35991,
      city_id: '375dd587-9001-acbd-84a4-683dedfb933e',
      name: 'Aéroport YUL Trudeau',
      address: [
        '975 Roméo-Vachon Blvd North (bus & taxi loop)',
        'Dorval, QC H4Y',
        'Canada'
      ],
      type: 'bus_stop',
      lat: 45.4568721045985,
      lon: -73.7516283988953,
      geohash: 'f25d9eptq'
    },
    {
      id: 36029,
      city_id: '375dd587-9001-acbd-84a4-683deda84183',
      name: 'Clifton SIR Station',
      address: ['845-869 Bay St', 'Staten Island', 'NY 10304, USA'],
      type: 'bus_stop',
      lat: 40.621349,
      lon: -74.07135,
      geohash: 'dr5r46yus'
    },
    {
      id: 36102,
      city_id: '375dd587-9001-acbd-84a4-683deda84183',
      name: '4211 Broadway',
      address: ['4211 Broadway', 'New York', 'NY 10033', 'USA'],
      type: 'bus_stop',
      lat: 40.848852,
      lon: -73.938404,
      geohash: 'dr72mkr9y'
    },
    {
      id: 36028,
      city_id: '375dd587-9001-acbd-84a4-683deda84183',
      name: 'Brooklyn, 375 Hamilton Ave',
      address: ['375 Hamilton Ave', 'Brooklyn', 'NY 11231, USA'],
      type: 'bus_stop',
      lat: 40.6730638,
      lon: -73.9988774,
      geohash: 'dr5rkh79v'
    }
  ],
  operators: [
    {
      id: 'bfc27cd544ca49c18d000f2bc00c58c0',
      source_id: 155,
      profile_id: 111,
      name: 'Greyhound',
      url: null,
      logo_url:
        'https://busbud-pubweb-assets-staging.global.ssl.fastly.net/images-service/operator-logos/greyhound.png?hash=1{&height,width}',
      display_name: 'Greyhound',
      sellable: true,
      fuzzy_prices: false,
      sell_tickets_cutoff: {
        hours: 1
      },
      amenities: {
        classes: {
          Normal: {
            display_name: 'Economy',
            wifi: true,
            toilet: true,
            ac: true,
            food: false,
            refreshment: false,
            power_outlets: true,
            tv: false,
            bus_attendant: false,
            leg_room: false
          },
          Economy: {
            display_name: 'Economy',
            wifi: true,
            toilet: true,
            ac: true,
            food: false,
            refreshment: false,
            power_outlets: true,
            tv: false,
            bus_attendant: false,
            leg_room: false
          }
        }
      },
      source: 'greyhound_us',
      referral_deal: false,
      display_url: null,
      fraud_check: 'iovation',
      terms: {
        refund: false,
        exchange: true,
        bag_allowed: true,
        piece_of_id: false,
        boarding_requirement: 'printed_tkt',
        extra_bag_policy: true,
        use_new_ticket: false,
        exchange_cutoff: 24,
        nb_checked_bags: 1,
        kg_by_bag: 25,
        nb_carry_on: 1,
        extra_bag_cost: 1500
      }
    }
  ],
  departures: [
    {
      id: '7c5dd26a',
      source_id: 155,
      checkout_type: 'new',
      operator_id: 'bfc27cd544ca49c18d000f2bc00c58c0',
      origin_location_id: 36102,
      destination_location_id: 25179,
      class: 'Economy',
      class_name: 'Economy',
      amenities: {
        display_name: 'Economy',
        wifi: true,
        toilet: true,
        ac: true,
        food: false,
        refreshment: false,
        power_outlets: true,
        tv: false,
        bus_attendant: false,
        leg_room: false
      },
      available_seats: 55,
      prices: {
        total: 5200,
        breakdown: {
          base: 5200
        },
        categories: {},
        discounted: false
      },
      ticket_types: ['print'],
      departure_timezone: 'America/New_York',
      arrival_timezone: 'America/Montreal',
      departure_time: '2016-01-14T00:01:00',
      arrival_time: '2016-01-14T07:55:00'
    },
    {
      id: '7d6aa31b',
      source_id: 112,
      checkout_type: 'new',
      operator_id: 'bfc27cd544ca49c18d000f2bc00c58c0',
      origin_location_id: 24010,
      destination_location_id: 17508,
      class: 'Economy',
      class_name: 'Economy',
      amenities: {
        display_name: 'Economy',
        wifi: true,
        toilet: true,
        ac: true,
        food: false,
        refreshment: false,
        power_outlets: true,
        tv: false,
        bus_attendant: false,
        leg_room: false
      },
      available_seats: 25,
      prices: {
        total: 5500,
        breakdown: {
          base: 5500
        },
        categories: {},
        discounted: false
      },
      ticket_types: ['print'],
      departure_timezone: 'America/New_York',
      arrival_timezone: 'America/Montreal',
      departure_time: '2016-01-14T00:10:00',
      arrival_time: '2016-01-14T08:25:00'
    }
  ],
  complete: false,
  ttl: 600,
  is_valid_route: true
});
