const VALID_CITIES = [
  {
    geohash: 'dr5reg',
    cityName: 'New York'
  }, {
    geohash: 'f25dvk',
    cityName: 'Montreal'
  }
];

export const parseTime = (rawDate) => {
  const date = new Date(Date.parse(rawDate));
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const delay = t => (
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, t);
  })
);

export const geohashToName = geohash => (
  VALID_CITIES.find(city => city.geohash === geohash).cityName
);

export const cityNameToGeohash = cityName => (
  VALID_CITIES.find(city => city.cityName === cityName).geohash
);
