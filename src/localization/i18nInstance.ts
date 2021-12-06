import { i18nOptions } from './i18nOptions';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

const i18nInstance = i18next.createInstance();
i18nInstance
  .use(initReactI18next)
  .init({
    ...i18nOptions,
  })
  .then((result) => result)
  .catch((error) => console.error(error));

export default i18nInstance;
