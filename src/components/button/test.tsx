// Packages
import React from 'react'
import { fireEvent, cleanup } from '@testing-library/react'

// Helpers
import { renderWithTheme } from 'helpers/testing-library'

// Components
import Button from '.'

afterEach(cleanup)

const handleClick = jest.fn()

describe('<Button />', () => {
  test('should render a button', () => {
    const { getByTestId } = renderWithTheme(
      <Button onClick={handleClick}>Click Me</Button>
    )

    expect(getByTestId(/button/)).toBeInTheDocument()
  })

  test('should call a function after clicking on the button', () => {
    const { getByTestId } = renderWithTheme(
      <Button onClick={handleClick}>Click Me</Button>
    )

    fireEvent.click(getByTestId(/button/))
    expect(handleClick).toBeCalled()
  })

  test('should render the button color correctly', () => {
    const { container } = renderWithTheme(
      <Button primary onClick={handleClick}>
        Click Me
      </Button>
    )

    expect(container.firstChild).toHaveStyle({ 'background-color': '#FBAE16' })
  })
})
