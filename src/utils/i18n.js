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
        header: { from: 'From', to: 'To', search: 'Search', outboundDate: 'Departure date' },
        result: {
          noRoutes: 'No route found',
        },
        error: {
          pastDate: 'Departure date is in the past',
          unknown: 'Unknown error',
        },
      },
    },
    pt: {
      translation: {
        header: { from: 'De', to: 'Para', search: 'Buscar', outboundDate: 'Data de partida' },
        result: {
          noRoutes: 'Nenhuma rota encontrada',
        },
        error: {
          pastDate: 'Data de partida está no passado',
          unknown: 'Erro desconhecido',
        },
      },
    },
    fr: {
      translation: {
        header: { from: 'De', to: 'À', search: 'Rechercher', outboundDate: 'Date de départ' },
        result: {
          noRoutes: 'Aucun départ',
        },
        error: {
          pastDate: 'La date de départ est dans le passé',
          unknown: 'Erreur inconnue',
        },
      },
    },
  },
});

export default i18next;
