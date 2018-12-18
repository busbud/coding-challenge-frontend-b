import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n.use(LanguageDetector).init({
  resources: {
    en: {
      translations: {
        'Departure':
          'Departure',
        'Arrival':
          'Arrival',
        'Passengers':
        'Passagers',
        'search':
          'Search',
        'select':
          'Select',
        'results':
          ' results'
      }
    },
    fr: {
      translations: {
        'Departure':
          'Départ',
        'Arrival':
          'Arrivée',
        'Passengers':
          'Passagers',
        'search':
          'Trouver',
        'select':
          'Choisir',
        'results':
          ' résultats'
      }
    }
  },
  fallbackLng: 'en',
  debug: false,

  ns: ['translations'],
  defaultNS: 'translations',

  keySeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ','
  },
  react: {
    wait: true
  }
})

export default i18n
