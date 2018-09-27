import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { ENGLISH } from './constants/language';
import resources from '../locales';

i18n
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .init({
    resources,
    fallbackLng: ENGLISH,
    load: 'languageOnly',
    react: {
      wait: true,
    },
  });

export default i18n;
