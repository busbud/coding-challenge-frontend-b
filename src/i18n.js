import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';
import languages from './utils/languageList';

const { ENGLISH, FRENCH } = languages;

const resources = {
  [ENGLISH]: {
    translation: {
      'Excited for an upcoming weekend at Osheaga?':
        'Excited for an upcoming weekend at Osheaga? Click below to see all departures for one adult on Aug 2nd 2019 for the following route:',
      'NYC to MTL': 'New York to Montreal',
      Search: 'Search',
      Departure: 'Departure',
      Arrival: 'Arrival',
      'Could not find departures':
        'Could not find departures. Please try again',
      'Request complete': 'Request complete',
      'Request was interrupted':
        'Request was interrupted. Please refresh the page to try again',
      'No departures available':
        'No departures available. Please choose another day',
    },
  },
  [FRENCH]: {
    translation: {
      'Excited for an upcoming weekend at Osheaga?':
        "Envie d'un week-end à Osheaga? Cliquez ci-dessous pour voir tous les départs pour un adulte le 2 août 2019 pour l'itinéraire suivant:",
      'NYC to MTL': 'New York à Montréal',
      Search: 'Chercher',
      Departure: 'Départ',
      Arrival: 'Arrivée',
      'Could not find departures':
        'Impossible de trouver les départs. Veuillez réessayer',
      'Request complete': 'Demande terminée',
      'Request was interrupted':
        'La demande a été interrompue. Veuillez actualiser la page pour réessayer.',
      'No departures available':
        'Aucun départ disponible. Veuillez choisir un autre jour',
    },
  },
};

const options = {
  // if localStorage is empty, then it will detect language from browser.
  // if translations aren't available , then the fallback is English
  order: [
    'localStorage',
    'navigator',
    'querystring',
    'cookie',
    'htmlTag',
    'path',
    'subdomain',
  ],

  // keys or params to lookup language from
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'lang',
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,

  // cache user language on
  caches: ['localStorage', 'cookie'],
  excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

  // optional expire and domain for set cookie
  cookieMinutes: 10,
  cookieDomain: 'myDomain',

  // optional htmlTag with lang attribute, the default is:
  htmlTag: document.documentElement,
};

i18n
  .use(detector)
  .use(reactI18nextModule)
  .init({
    detection: options,
    resources,
    fallbackLng: ENGLISH,

    keySeparator: false,

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
