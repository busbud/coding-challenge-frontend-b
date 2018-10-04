import * as i18n from 'i18next';
import * as LanguageDetector from 'i18next-browser-languagedetector';
import * as Backend from 'i18next-xhr-backend';
import { reactI18nextModule } from 'react-i18next';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .init({
    fallbackLng: 'en',
    debug: true,
    interpolation: { escapeValue: false },
    react: { wait: true},
    lng: 'en',
    resources: {
      en: {
        translation: {
          title: 'Its Time to book for',
          search: 'Search',
          nonStop: 'Non Stop',
          montreal: 'Montreal'
        }
      },
      fr: {
        translation: {
          title: 'C\'est le temps de réserver pour',
          nonStop: 'Sans Arrêt',
          search: 'Rechercher',
          montreal: 'Montréal'
        }
      }
    }
  });

export default i18n;
