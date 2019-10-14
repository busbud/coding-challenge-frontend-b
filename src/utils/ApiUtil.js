import keyBy from 'lodash/keyBy';
import moment from 'moment-timezone';

export const formatDepartures = data => {
  try {
    const keyedCities = keyBy(data.cities, 'id');
    const keyedLocations = keyBy(data.locations, 'id');
    const keyedOperators = keyBy(data.operators, 'id');
    return data.departures.map(departure => {
      const formattedDeparture = {};
      const operator = keyedOperators[departure.operator_id];
      const originLocation =
        keyedLocations[departure.origin_location_id];
      originLocation.city = keyedCities[originLocation.city_id];
      const destinationLocation =
        keyedLocations[departure.destination_location_id];
      // Format our response
      formattedDeparture.id = departure.id;
      formattedDeparture.operatorName = operator.name;
      formattedDeparture.operatorLogo = operator.logo_url.replace(
        /\{width\}|\{height\}/g,
        200,
      );
      formattedDeparture.originLocationName = originLocation.name;
      formattedDeparture.destinationLocationName =
        destinationLocation.name;
      if (departure.departure_time) {
        const momentTime = moment(departure.departure_time).tz(
          departure.departure_timezone,
        );
        formattedDeparture.departureTime = momentTime.format(
          'MM/DD/YYYY ha z',
        );
        formattedDeparture.departureSort = momentTime.valueOf();
      } else {
        formattedDeparture.departureTime = null;
      }
      if (departure.arrival_time) {
        formattedDeparture.arrivalTime = moment(
          departure.arrival_time,
        )
          .tz(departure.arrival_timezone)
          .format('MM/DD/YYYY ha z');
      } else {
        formattedDeparture.arrivalTime = null;
      }
      formattedDeparture.priceDetail = `${departure.prices.currency} ${departure.prices.total}`;

      formattedDeparture.wifi = departure.amenities.wifi;
      formattedDeparture.toilet = departure.amenities.toilet;
      formattedDeparture.ac = departure.amenities.ac;
      formattedDeparture.refreshment =
        departure.amenities.refreshment;
      formattedDeparture.tv = departure.amenities.tv;
      formattedDeparture.power = departure.amenities.power;

      formattedDeparture.availableSeats = departure.available_seats;

      return formattedDeparture;
    });
  } catch (error) {
    throw error;
  }
};
