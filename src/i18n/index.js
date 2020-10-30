import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// TODO : get translations from http endpoint instead of having locally

import fr from './fr.json';
import en from './en.json';

export const resources = {
  fr: {
    translation: { ...fr },
  },
  en: {
    translation: { ...en },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
