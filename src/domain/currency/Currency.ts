import { EN, PT, FR, ES, Language } from '../language/Language'

export const USD = 'USD'
export const CAD = 'CAD'
export const EUR = 'EUR'
export const BRL = 'BRL'

export const currencies: Currency[] = [USD, CAD, EUR, BRL]
export type Currency = typeof USD | typeof CAD | typeof EUR | typeof BRL

export const getLocationCurrency = (location: Language): Currency => {
  const currencyMap = {
    [EN]: USD,
    [FR]: CAD,
    [ES]: EUR,
    [PT]: BRL,
  }
  return currencyMap[location] as Currency
}
