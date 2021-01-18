import dynamicString from '.'

describe('Helper: [dynamicTemplate]', () => {
  test('should interpolate strings', () => {
    const template = 'Hello ${world}'
    const value = { world: 'John Doe' }

    const twoOrMoreWords = 'Hi ${name}, welcome to ${country}'
    const values = { name: 'Marcus Silva', country: 'Canada' }

    expect(dynamicString(template, value)).toEqual('Hello John Doe')
    expect(dynamicString(twoOrMoreWords, values)).toEqual(
      'Hi Marcus Silva, welcome to Canada'
    )
  })
})
