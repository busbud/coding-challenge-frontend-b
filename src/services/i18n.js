import 'moment/locale/fr';

import i18n from 'i18next';
import moment from 'moment';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from '../assets/translations/en';
import fr from '../assets/translations/fr';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    resources: {
      en,
      fr
    },
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false
    }
  })
  .then(() => {
    moment.locale(getCurrentLng());
  });

export function getCurrentLng() {
  return i18n.language || window.localStorage.i18nextLng || '';
}
