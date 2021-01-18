import formatCurrency from '.'

test('Helper: [formatCurrency]', () => {
  const amount = 1000

  expect(formatCurrency({ amount })).toEqual('$10.00')
  expect(formatCurrency({ amount: 0 - amount })).toEqual('- $10.00')

  expect(formatCurrency({ amount, currency: 'BRL' })).toEqual('R$10.00')
  expect(formatCurrency({ amount, currency: 'EUR' })).toEqual('€10.00')
})
