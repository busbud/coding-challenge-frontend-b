const formatCurrency = ({ amount = 0, currency = 'USD' }): string => {
  const isNegative = amount < 0
  const sign = isNegative ? '- ' : ''
  const positiveAmount = Math.abs(amount)
  const normalizedAmount = positiveAmount / 100

  const localizedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency ? currency : 'USD',
    minimumFractionDigits: 2
  }).format(normalizedAmount)

  return `${sign}${localizedAmount}`
}

export default formatCurrency
