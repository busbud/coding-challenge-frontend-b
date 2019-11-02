export default {
  origin_city_id: "375dd587-9001-acbd-84a4-683deda84183",
  destination_city_id: "375dd587-9001-acbd-84a4-683dedfb933e",
  cities: [
    {
      id: "375dd587-9001-acbd-84a4-683deda84183",
      region_id: 6417,
      name: "New York",
      lat: 40.71427,
      lon: -74.00597,
      geohash: "dr5reg",
      timezone: "America/New_York",
      image_url:
        "https://busbud.imgix.net/city-hires/1474307214322-NewYork,NewYork,UnitedStates.jpg?h={height}&w={width}&auto=format,compress",
      hero_image_url:
        "https://busbud.imgix.net/city-heroes/newyork.jpg?h={height}&w={width}&auto=format",
      legacy_url_form: "NewYork,NewYork,UnitedStates",
      country_code2: "US",
      full_name: "New York, New York, United States",
      short_name: "New York, NY, USA",
      locale: "en",
      region: {
        id: 6417,
        region_code: "NY",
        country_code2: "US",
        name: "New York",
        short_name: "NY",
        locale: "en",
        country: {
          code2: "US",
          code3: "USA",
          name: "United States",
          short_name: "USA",
          continent: "NA",
          default_locale: "en",
          default_currency: "USD",
          population: 310232863,
          locale: "en"
        }
      }
    }
  ],
  locations: [
    {
      id: 5178,
      city_id: "375dd587-9001-acbd-84a4-683deda84183",
      name: "New York City",
      address: [],
      type: "other",
      lat: null,
      lon: null,
      geohash: null
    },
    {
      id: 6933,
      city_id: "375dd587-9001-acbd-84a4-683deda84183",
      name: "31st St & 8th Ave",
      address: [
        "349 W 31st St (between 8th & 9th Avenue)",
        "New York, NY 10001"
      ],
      type: "bus_stop",
      lat: 40.750996,
      lon: -73.996178,
      geohash: "dr5ru4mxu"
    }
  ],
  operators: [
    {
      id: "0e753dbf-a9de-4339-8a00-bbb6f4813d18",
      source_id: 175,
      profile_id: 213,
      name: "Adirondack Trailways",
      url: "https://trailwaysny.com",
      logo_url:
        "https://busbud.imgix.net/operator-logos/logo_trailways.png?h={height}&w={width}&auto=format&fit=fill&bg=0FFF",
      display_name: "Adirondack Trailways",
      review_state: "good",
      sellable: true,
      fuzzy_prices: false,
      sell_tickets_cutoff: {
        minutes: 30
      },
      amenities: {
        classes: {
          Normal: {
            display_name: "",
            wifi: true,
            toilet: true,
            ac: true,
            refreshment: false,
            food: false,
            hot_meal: false,
            power_outlets: true,
            tv: true,
            bus_attendant: false,
            leg_room: false,
            small_seat: false,
            average_seat: true,
            xl_seat: false,
            full_recline_seat: false
          },
          Economy: {
            display_name: "",
            wifi: true,
            toilet: true,
            ac: true,
            refreshment: false,
            food: false,
            hot_meal: false,
            power_outlets: true,
            tv: true,
            bus_attendant: false,
            leg_room: false,
            small_seat: false,
            average_seat: true,
            xl_seat: false,
            full_recline_seat: false
          }
        }
      },
      source: "ny_trailways",
      referral_deal: false,
      display_url: "trailwaysny.com",
      fraud_check: null
    },
  ],
  departures: [
    {
      amenities: {
        display_name: "",
        wifi: true,
        toilet: true,
        ac: true,
        refreshment: false,
        food: false,
        hot_meal: false,
        power_outlets: true,
        tv: true,
        bus_attendant: false,
        leg_room: false,
        small_seat: false,
        average_seat: true,
        xl_seat: false,
        full_recline_seat: false
      },
      arrival_timezone: "America/Montreal",
      available_seats: 50,
      bus: null,
      busbud_departure_id: "90f102d0",
      class: "Economy",
      class_name: "",
      complete: false,
      contractor_name: null,
      fare_name: null,
      deeplink: null,
      departure_timezone: "America/New_York",
      departure_type: null,
      destination_location_id: 1938,
      duration: 535,
      has_search_details: true,
      has_bus_details: null,
      has_transfers: false,
      has_addons: null,
      id: "OTM4Zjc3NTc6OTBmMTAyZDA",
      links: {
        deeplink:
          "https://www.busbud.com/en/deeplink/dr5reg/f25dvk/OTM4Zjc3NTc6OTBmMTAyZDA?outbound_date=2020-08-02&return_date&adults=1&children=0&seniors=0&child_ages=&senior_ages=&discount_code&utm_source={utm_source}&utm_campaign={utm_campaign}&utm_medium={utm_medium}"
      },
      num_transfers: 0,
      operator_id: "0e753dbf-a9de-4339-8a00-bbb6f4813d18",
      origin_location_id: 1942,
      passenger_questions: [],
      schedule_id: null,
      sellable: true,
      source_id: 175,
      ticket_types: ["print"],
      departure_time: "2020-08-02T11:00:00",
      arrival_time: "2020-08-02T19:55:00",
      fetched_at: "2019-11-01T06:05:42.181Z",
      search_request_id:
        "201911010612df37d0aadc78fbd6815b846feecd9a3b68642adadb73645bd527c24a18b4a890",
      unreliable_duration: null,
      has_unmapped_location: null,
      data_source: "l2",
      cache_source: "departure-service",
      prices: {
        currency: "USD",
        total: 7850,
        categories: {
          adult: 7600,
          child: 7600,
          senior: 7600
        },
        discount: 0,
        roundtrip_min: null,
        roundtrip_total: null,
        discounted: null,
        breakdown: {
          base: 7600,
          fees: 250,
          taxes: 0,
          discount: 0
        }
      },
      trip_stops: [],
      addons: [],
      details: {},
      terms: {
        type_of_id: "photo_and_full_name",
        ticket_requirements: {
          print: "printed_tkt",
          claim: "printed_tkt"
        },
        nb_carry_on: 1,
        kg_by_carry_on: null,
        nb_checked_bags: 2,
        kg_by_bag: 23,
        checked_in_size_cm: null,
        extra_checked_in_fees: {
          type: "per_extra_checked_in",
          amount: 1500
        },
        nb_extra_checked_in: null,
        total_checked_in_kg: null,
        oversized_luggage: {
          allowed: true,
          allowed_types: ["bicycle", "sport_equipment"],
          fees: {
            type: "flat_fee",
            amount: 2000
          },
          early_arrival_required: true,
          cover_required: true
        },
        animals: {
          fees: {
            type: "unknown",
            amount: null,
            percent: null
          },
          main_compartment_allowed: false,
          hold_compartment_allowed: false,
          main_max_weight_kg: null,
          main_small_cage_required: null,
          hold_max_weight_kg: null,
          vaccination_required: true,
          special_animals_allowed: true,
          early_arrival_required: true,
          specific_hours: null
        },
        refund_policies: [
          {
            type: "no-refund",
            flat_fee: null,
            flat_fee_currency: null,
            percent_fee: null,
            cutoff_reference: "departure-date",
            cutoff_from: null,
            cutoff_to: null,
            external_link: null
          }
        ],
        refund: false,
        refund_cutoff: null,
        exchange_policies: [
          {
            type: "no-exchange",
            flat_fee: null,
            flat_fee_currency: null,
            percent_fee: null,
            cutoff_reference: "departure-date",
            cutoff_from: null,
            cutoff_to: null,
            external_link: null
          }
        ],
        exchange: false,
        exchange_cutoff: null,
        currency: "USD",
        addons: {},
        piece_of_id: true,
        boarding_requirement: "printed_tkt",
        extra_bag_policy: true,
        extra_bag_cost: 1500,
        extra_bag_kg_cost: null,
        bag_allowed: true
      }
    }
  ],
  search_request_ids: [
    "201911010612df37d0aadc78fbd6815b846feecd9a3b68642adadb73645bd527c24a18b4a890",
    "201911010605b9c9b825cecf5020169f3bd943090fe4e87b8ebe1019ee0d34bb0b84ead68dda"
  ],
  complete: true,
  ttl: 551,
  is_valid_route: true
};
