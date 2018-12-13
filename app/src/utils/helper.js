const moment = require("moment");

export const getFormatedDate = (date) =>
  moment(date, moment.ISO_8601).format("DD/MM/YYYY");

export const getTimeFromMins = (minutes) => {
  const h = minutes / 60 | 0;
  const m = minutes % 60 | 0;
  return moment.utc().hours(h).minutes(m).format("HH[h] mm[min]");
}

export const getTimefromDate = (date) =>
  moment(date, moment.ISO_8601).format("HH:mm");

export const getOperatorByOperatorId = (operator_id, operators) =>
  operators.filter(operator => operator.id === operator_id)[0];


export const getLocationByLocationId = (location_id, locations, city) => {
  const location = locations.filter(location => location.id === location_id)[0];
  location.city = city;
  return location
}

export const extendCities = (cities, origin_city_id, destination_city_id) => {
  const originCity = cities.filter(city => city.id === origin_city_id)[0];
  const destinationCity = cities.filter(city => city.id === destination_city_id)[0];
  return {
    origin_city: originCity,
    destination_city: destinationCity
  }
}

export const formatPrice = (price) => {
  return (Math.round((price / 100) * Math.pow(10, 2)) / Math.pow(10, 2)).toFixed(2)
}

