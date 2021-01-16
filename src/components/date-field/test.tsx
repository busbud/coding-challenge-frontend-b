// Packages
import React from 'react'
import { cleanup, fireEvent, waitFor } from '@testing-library/react'

import { renderWithTheme } from 'helpers/testing-library'

// Components
import DateField from '.'

afterEach(cleanup)

const today = new Date('01/14/2021')

const DateComponent = () => {
  const [value, setValue] = React.useState<Date>(today)
  return (
    <DateField
      name="date"
      value={value}
      onChange={({ target: { value } }) => setValue(value)}
    />
  )
}

describe('<DateField />', () => {
  test('should select a date', (): void => {
    const { getByText, getByTestId, container } = renderWithTheme(
      <DateComponent />
    )
    const input = getByTestId('date')
    fireEvent.click(input)
    const calendar = container.querySelector('.Selectable')
    expect(calendar).toBeTruthy()

    fireEvent.click(getByText(`${today.getDate() + 1}`))
    waitFor(() => expect(input).toHaveValue('Fri, 15 Jan'))
  })
})
