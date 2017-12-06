const VALID_CITIES = [
  {
    geohash: 'dr5reg',
    cityName: 'New York',
  }, {
    geohash: 'f25dvk',
    cityName: 'Montreal',
  },
];

const LANGUAGES = [
  {
    lang_id: 'en',
    name: 'English',
  }, {
    lang_id: 'fr',
    name: 'Français',
  }, {
    lang_id: 'pt',
    name: "Português"
  },
];

export function delay(t) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, t);
  });
}

export function geohashToName(geohash) {
  return VALID_CITIES.find(city => city.geohash === geohash).cityName
}

export function langIdToName(id) {
  return LANGUAGES.find(lang => lang.lang_id === id).name
}

export function getAvailableLanguages() {
  return LANGUAGES
}

