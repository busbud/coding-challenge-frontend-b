import axios from 'axios';
import { GEOHASHES, HEADERS, SEARCH_INIT_URL } from '../constants.js';

const createSearchInitEndpoint = (ORIGIN_GEOHASH, DESTINATION_GEOHASH, departure_date) =>
    `${SEARCH_INIT_URL}/${ORIGIN_GEOHASH}/${DESTINATION_GEOHASH}/${departure_date}`;

const createSearchPollEndpoint = (search_init_endpoint) => `${search_init_endpoint}/poll`;

const generateResponse = (departures, locations) => {
    return departures.map((d) => {
        return {
            id: d.id,
            departure_time: d.departure_time,
            departure_timezone: d.departure_timezone,
            arrival_time: d.arrival_time,
            arrival_timezone: d.arrival_timezone,
            total_price: d.prices.total,
            departure_location: locations[d.origin_location_id].name,
            arrival_location: locations[d.destination_location_id].name,
            currency: d.prices.currency, // I checked multiple times but prices seem to be so huge!
        };
    });
};

export const get_departures = async (params) => {
    const { departure_date, departure_origin, arrival_origin, ...rest } = params;
    const ORIGIN_GEOHASH = GEOHASHES[departure_origin];
    const DESTINATION_GEOHASH = GEOHASHES[arrival_origin];

    const search_init_endpoint = createSearchInitEndpoint(
        ORIGIN_GEOHASH,
        DESTINATION_GEOHASH,
        departure_date
    );

    const search_poll_endpoint = createSearchPollEndpoint(search_init_endpoint);

    let departures = [];
    let locations = {};
    let complete = false;

    try {
        let data = await axios.get(search_init_endpoint, {
            headers: HEADERS,
            params: rest,
        });

        departures = [...departures, ...data.data.departures];
        locations = data.data.locations.reduce((locations, location) => {
            locations[location.id] = location;
            return locations;
        }, {});
        complete = data.data.complete;

        // could have done recursion with exit condition complete:true
        // decided to go with a simpler while loop for better readability
        while (!complete) {
            let nextData = await axios.get(search_poll_endpoint, {
                headers: HEADERS,
                params: { ...rest, index: departures.length },
            });
            departures = [...departures, ...nextData.data.departures];
            locations = nextData.data.locations.reduce((locations, location) => {
                locations[location.id] = location;
                return locations;
            }, {});
            complete = nextData.data.complete;
        }

        return generateResponse(departures, locations);
    } catch (e) {
        throw new Error(e);
    }
};
