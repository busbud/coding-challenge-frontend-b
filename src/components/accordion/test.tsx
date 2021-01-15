// Packages
import React from 'react'
import { fireEvent, cleanup } from '@testing-library/react'

// Helpers
import { renderWithTheme } from 'helpers/testing-library'

// Components
import Accordion from '.'

afterEach(cleanup)

describe('<Accordion />', () => {
  test('should render a component', (): void => {
    const { getByText } = renderWithTheme(<Accordion trigger="awesome" />)
    expect(getByText(/awesome/)).toBeTruthy()
  })

  test('should play the accordion!', () => {
    const { getByTestId, getByText } = renderWithTheme(
      <Accordion trigger={<h1>top five rock bands</h1>}>
        <h1>Black Sabbath</h1>
        <h1>Led Zeppelin</h1>
        <h1>Beatles</h1>
        <h1>Queen</h1>
        <h1>Guns N Roses</h1>
      </Accordion>
    )

    const button = getByTestId('accordion-button')
    fireEvent.click(button)
    expect(getByText(/Queen/)).toBeTruthy()
  })
})
