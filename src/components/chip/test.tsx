// Packages
import React from 'react'
import { screen } from '@testing-library/react'

// Helpers
import { renderWithTheme } from 'helpers/testing-library'

// Components
import Chip from '.'

describe('<Chip />', () => {
  test('should render a card', (): void => {
    const { getByTestId } = renderWithTheme(
      <Chip title="Busbud" subTitle="We connecting you with the world" />
    )
    expect(getByTestId(/chip/)).toBeInTheDocument()
  })

  test('should render the button colors correctly', (): void => {
    const { rerender } = renderWithTheme(
      <Chip title="Busbud" subTitle="We connecting you with the world" />
    )

    expect(screen.getByTestId(/chip/)).toHaveTextContent(/Busbud/i)
    expect(screen.getByTestId(/chip/)).toHaveTextContent(
      /We connecting you with the world/i
    )

    rerender(<Chip title="Busbud 2.0" subTitle="Travel around the world" />)

    expect(screen.getByTestId(/chip/)).toHaveTextContent(/Busbud 2.0/i)
    expect(screen.getByTestId(/chip/)).toHaveTextContent(
      /Travel around the world/i
    )
  })
})
