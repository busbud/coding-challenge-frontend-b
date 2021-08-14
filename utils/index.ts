export const formatDate = (date: string | Date, locale?: string) =>
  Intl.DateTimeFormat(locale).format(new Date(date))

export const formatTime = (date: string | Date, locale?: string) =>
  Intl.DateTimeFormat(locale, { timeStyle: 'short' }).format(new Date(date))

export const formatCurrency = (
  value: number,
  currency: string,
  locale?: string
) =>
  new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value)
