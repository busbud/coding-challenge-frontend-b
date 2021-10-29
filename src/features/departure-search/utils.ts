export function formatTimeToLocale(
  date: Date | string,
  locale: string = 'en'
): string {
  const newDate = new Date(date)
  return newDate.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatCurrencyToLocale(
  price: number,
  currency: string,
  locale: string = 'en'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(price)
}
