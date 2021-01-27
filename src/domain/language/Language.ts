export const EN = 'en'
export const FR = 'fr'
export const ES = 'es'
export const PT = 'pt'

export type Language = typeof EN | typeof FR | typeof ES | typeof PT

type Languages = {
  id: string
  code: Language
}[]

export const languages = [
  {
    id: 'english',
    code: EN,
  },
  {
    id: 'portuguese',
    code: PT,
  },
  {
    id: 'spanish',
    code: ES,
  },
  {
    id: 'french',
    code: FR,
  },
]

export const getLangId = (code: Language) =>
  languages.find((lang) => lang.code === code)?.id
