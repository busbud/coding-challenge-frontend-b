import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(LanguageDetector).init({
  // we init with resources
  resources: {
    en: {
      translations: {
        loading: 'loading',
        language: 'language',
        from: 'from',
        to: 'to',
        adultPassager: 'passager(adult)'
      }
    },
    fr: {
      translations: {
        loading: 'patientez',
        language: 'langue',
        from: 'de',
        to: 'à',
        adultPassager: 'passageur(adulte)'
      }
    }
  },
  fallbackLng: 'en',
  debug: true,

  // have a common namespace used around the full app
  ns: ['translations'],
  defaultNS: 'translations',

  keySeparator: false, // we use content as keys

  interpolation: {
    formatSeparator: ','
  },

  react: {
    wait: true
  }
});

export default i18n;
