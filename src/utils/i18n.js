import i18next from 'i18next';

i18next.init({
  interpolation: {
    escapeValue: false, // React already does escaping
  },
  defaultNS: 'translation',
  fallbackLng: 'en',
  lng: 'en',
  resources: {
    en: {
      translation: {
        header: { from: 'From', to: 'To', search: 'Search' },
      },
    },
    pt: {
      translation: {
        header: { from: 'De', to: 'Para', search: 'Buscar' },
      },
    },
    fr: {
      translation: {
        header: { from: 'De', to: 'À', search: 'Rechercher' },
      },
    },
  },
});

export default i18next;
