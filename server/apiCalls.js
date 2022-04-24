import axios from 'axios';

const SEARCH_INIT_URL = 'https://napi.busbud.com/x-departures';
const ORIGIN_GEOHASH = 'f2m673';
const DESTINATION_GEOHASH = 'f25dvk';
const DEPARTURE_DATE = '2022-07-01';

const PARAMS = {
    adult: 5,
    child: 0,
    senior: 0,
    lang: 'en',
    currency: 'CAD',
};

const search_init_endpoint = `${SEARCH_INIT_URL}/${ORIGIN_GEOHASH}/${DESTINATION_GEOHASH}/${DEPARTURE_DATE}`;
const search_poll_endpoint = `${search_init_endpoint}/poll`;

export const get_departures = async (
    origin_geohash,
    destination_geohash,
    departure_date,
    params
) => {
    let departures = [];
    let locations = {};
    let results = [];
    let complete = false;

    try {
        let data = await axios.get(search_init_endpoint, {
            headers: {
                Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
                'X-Busbud-Token': 'PARTNER_c9g6z7V0SNqUlnar2EFsxw',
            },
            params: PARAMS,
        });

        departures = [...departures, ...data.data.departures];
        locations = data.data.locations.reduce((locations, location) => {
            locations[location.id] = location;
            return locations;
        }, {});
        complete = data.data.complete;

        console.log(departures);

        while (!complete) {
            let nextData = await axios.get(search_poll_endpoint, {
                headers: {
                    Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
                    'X-Busbud-Token': 'PARTNER_c9g6z7V0SNqUlnar2EFsxw',
                },
                params: { ...PARAMS, index: departures.length },
            });
            departures = [...departures, ...data.data.departures];
            locations = data.data.locations.reduce((locations, location) => {
                locations[location.id] = location;
                return locations;
            }, {});
            complete = data.data.complete;
        }

        return departures.map((d) => {
            return {
                departure_time: d.departure_time,
                departure_timezone: d.departure_time,
                arrival_time: d.arrival_time,
                arrival_timezone: d.arrival_timezone,
                total_price: d.prices.total,
                departure_location: locations[d.origin_location_id].name,
                arrival_location: locations[d.destination_location_id].name,
                currency: d.prices.currency,
            };
        });
    } catch (e) {
        throw new Error(e);
    }
};

get_departures();
