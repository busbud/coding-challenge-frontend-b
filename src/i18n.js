import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import resources from '../locales';

i18n
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .init({
    resources,
    load: 'languageOnly',
    react: {
      wait: true,
    },
  });

export default i18n;
