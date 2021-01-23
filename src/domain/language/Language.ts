import { Language } from 'grommet-icons'

export const EN = 'en'
export const FR = 'fr'
export const ES = 'es'
export const PT = 'pt'

type LanguageCode = typeof EN | typeof FR | typeof ES | typeof PT
export interface Language {
  readonly code: LanguageCode
}
