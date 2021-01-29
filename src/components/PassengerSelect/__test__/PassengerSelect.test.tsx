import React from 'react'
import { screen, fireEvent } from '@testing-library/react'
import { PassengerSelect } from '../PassengerSelect'
import { render } from 'test/components'

describe('PassengerSelect', () => {
  console.error = jest.fn()

  it('show counters to Add more passenger', () => {
    render(<PassengerSelect />, {
      container: document.querySelector(
        '[data-testid="GROMMET.WRAPPER"]'
      ) as HTMLElement,
    })
    fireEvent.click(screen.getByLabelText('Open Drop'))
    expect(screen.getAllByRole('menuitem').length).toBe(3)
  })

  it('adds 2 adults, 3 in total', () => {
    render(<PassengerSelect />, {
      container: document.querySelector(
        '[data-testid="GROMMET.WRAPPER"]'
      ) as HTMLElement,
    })
    fireEvent.click(screen.getByLabelText('Open Drop'))
    fireEvent.click(
      screen.getByText('Adults').querySelector('[data-testid="INCREMENT"]')!
    )
    fireEvent.click(
      screen.getByText('Adults').querySelector('[data-testid="INCREMENT"]')!
    )
    expect(screen.getByText('Adults')).toHaveTextContent('3')
  })
})
