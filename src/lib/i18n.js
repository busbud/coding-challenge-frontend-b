import i18n from 'i18next';

import en from '../locales/en.json';
import fr from '../locales/fr.json';

i18n
  .init({
    lng: 'en',

    ns: ['translation'],
    defaultNS: 'translation',

    interpolation: {
      escapeValue: false,
    },

    resources: {
      en: {
        translation: {
          filters: {
            sort: {
              title: 'Sort results',
              departure_time: 'Departure time',
              arrival_time: 'Arrival time',
              price_asc: 'Cheapest',
              price_desc: 'Most expensive',
            },
            options: {
              title: 'Options',
              lang: 'Language',
              currency: 'Currency',
            },
          },
        },
      },
      fr: {
        translation: {
          filters: {
            sort: {
              title: 'Trier les résultats',
              departure_time: 'Heure de départ',
              arrival_time: 'Heure d\'arrivée',
              price_asc: 'Le moins cher',
              price_desc: 'Le plus cher',
            },
            options: {
              title: 'Options',
              lang: 'Langue',
              currency: 'Devise',
            },
          },
        },
      },
    },
  });


export default i18n;
