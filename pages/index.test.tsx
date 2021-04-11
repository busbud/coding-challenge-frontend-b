import HomePage from './index'
import { render, screen } from '@testing-library/react'

describe('HomePage Component', () => {
  it('should welcome the visitor', () => {
    const { getByText } = render(<HomePage />)

    getByText(/Welcome to BusToFest!/)
  })
})