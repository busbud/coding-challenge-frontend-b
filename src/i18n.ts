import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './localization/resources';

const availableLanguages = ['en', 'fr'];
const browserLanguage = navigator.language.substring(0, 2);
const isAvailable = availableLanguages.find((elt) => elt === browserLanguage);
const defaultLanguage = isAvailable ? browserLanguage : 'en';

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLanguage,

  keySeparator: false,

  interpolation: {
    escapeValue: false
  }
});

export default i18n;
