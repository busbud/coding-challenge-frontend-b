export const USD = 'USD'
export const CAD = 'CAD'
export const EUR = 'EUR'
export const BRL = 'BRL'

type CurrencyCode = typeof USD | typeof CAD | typeof EUR | typeof BRL
export interface Currency {
  readonly code: CurrencyCode
}
