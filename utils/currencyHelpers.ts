export function formatToCurrency(ammount: number, currency: string, normalize = false): string {
  const NORMALIZITION_FACTOR = normalize
    ? 0.01 // divide 100 to normalize amount
    : 1

  return Intl
    .NumberFormat([], { style: 'currency', currency: currency})
    .format(ammount * NORMALIZITION_FACTOR)
}
