import { Locale } from '../types'

const translations = {
  en: {
    welcome: 'Welcome to Bus To Fest'
  },
  fr: {
    welcome: 'Bienvenue à Bus To Fest'
  }
}

export function translate(key: string, locale: Locale){
  return translations[locale][key]
}
