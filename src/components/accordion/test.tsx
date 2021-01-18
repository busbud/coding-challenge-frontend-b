// Packages
import React from 'react'
import { fireEvent, screen, cleanup } from '@testing-library/react'

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

    fireEvent.click(getByTestId(/accordion-button/))
    expect(getByText(/Queen/)).toBeTruthy()
  })

  test('can open accordion items to see the contents', () => {
    const { getByText } = renderWithTheme(
      <div>
        <Accordion trigger={<h1>top five rock bands</h1>}>
          <h1>Black Sabbath</h1>
          <h1>Led Zeppelin</h1>
          <h1>Beatles</h1>
          <h1>Queen</h1>
          <h1>Guns N Roses</h1>
        </Accordion>
        <Accordion trigger={<h1>R&B artists</h1>}>
          <h1>The Weeknd</h1>
          <h1>Jhené Aiko</h1>
          <h1>Frank Ocean</h1>
          <h1>John Legend</h1>
          <h1>Khalid</h1>
        </Accordion>
      </div>
    )

    fireEvent.click(getByText(/top five rock bands/))
    expect(screen.getByText(/Beatles/)).toBeInTheDocument()

    fireEvent.click(getByText(/R&B artists/))
    expect(screen.getByText(/Khalid/)).toBeInTheDocument()
  })
})
