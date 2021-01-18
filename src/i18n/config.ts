import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    whitelist: ['en-US', 'fr', 'es'],
    fallbackLng: 'en-US',
    preload: ['en-US', 'fr', 'es'],
    react: {
      wait: true,
      bindI18n: 'languageChanged loaded',
      useSuspense: false
    }
  })

export default i18n
