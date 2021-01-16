import pluralize from '.'

describe('[Helper: pluralize]', () => {
  test('should render singular word', () => {
    expect(pluralize(1, 'Passager')).toEqual('1 Passager')
  })

  test('should render plural word', () => {
    expect(pluralize(3, 'Passager')).toEqual('3 Passagers')
  })

  test('should render plural word with new suffix', () => {
    expect(pluralize(3, 'fox', 'es')).toEqual('3 foxes')
  })
})
