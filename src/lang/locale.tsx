import { Language } from '../domain/language/Language'

export const getMessages = async (locale: Language) => {
  try {
    return import(`../../lang/${locale}.json`)
  } catch (error) {
    console.error('Invalid Locale. Loading "en" as default')
    return import('../../lang/en.json')
  }
}
