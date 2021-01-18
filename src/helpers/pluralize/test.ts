import pluralize from '.'

describe('[Helper: pluralize]', () => {
  test('should render singular word', () => {
    expect(pluralize(1, 'Passenger')).toEqual('1 Passenger')
  })

  test('should render plural word', () => {
    expect(pluralize(3, 'Passenger')).toEqual('3 Passengers')
  })

  test('should render plural word with new suffix', () => {
    expect(pluralize(3, 'fox', 'es')).toEqual('3 foxes')
  })
})
