import i18n from 'i18next';

i18n
  .init({
    // we init with resources
    resources: {
      en: {
        translations: {
          msg: {
            error_api: 'Error during api call.',
            info_no_departures: 'No departures found.',
          },
          labels: {
            lang: "Language",
            search: 'Search',
            from: 'From',
            to: 'To',
            one_way: 'one-way',
            per_person: 'per person',
          },
          p: {
            departures: 'Departures from {{origin}} to {{destination}} on {{- date}}',
            footer: 'Made with <1></1> by <3>Daniel de Paula</3>'
          }
        }
      },
      fr: {
        translations: {
          msg: {
            error_api: 'Erreur detectée.',
            info_no_departures: 'Aucun départ trouvé.',
          },
          labels: {
            lang: "Langage",
            search: 'Rechercher',
            from: 'De',
            to: 'À',
            one_way: 'allé',
            per_person: 'par personne',
          },
          p: {
            departures: 'Départs de {{origin}} à {{destination}} le {{- date}}',
            footer: 'Fait avec <1>love</1> par <3>Daniel de Paula</3>'
          }
        }
      },
      pt: {
        translations: {
          msg: {
            error_api: 'Ocorreu um erro inesperado. Tente novamente.',
            info_no_departures: 'Nenhum serviço foi encontrado.',
          },
          labels: {
            lang: "Idioma",
            search: 'Buscar',
            from: 'De',
            to: 'Para',
            one_way: 'somente ida',
            per_person: 'por pessoa',
          },
          p: {
            departures: 'Serviços saindo de {{origin}} para {{destination}} em {{- date}}',
            footer: 'Feito com <1>love</1> por <3>Daniel de Paula</3>'
          }
        }
      },
    },
    fallbackLng: 'en',
    lng: 'en',

    defaultNS: 'translations',

    react: {
      wait: true
    }
  });

export default i18n;