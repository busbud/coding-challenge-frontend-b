// Packages
import React from 'react'
import { fireEvent, waitFor } from '@testing-library/react'
import selectEvent from 'react-select-event'

// Helpers
import { renderWithTheme } from 'helpers/testing-library'

// Components
import Select from '.'

const OPTIONS = [
  { value: 'Toronto', label: 'Toronto' },
  { label: 'Vancouver', value: 'Vancouver' },
  { label: 'Montreal', value: 'Montreal' }
]

function targetValueFactory(value: string) {
  return { target: { value } }
}

describe('<Select />', () => {
  test('should render select component', (): void => {
    const { getByTestId } = renderWithTheme(
      <div data-testid="select">
        <Select />
      </div>
    )
    expect(getByTestId('select')).toBeVisible()
  })

  test('should open focusing the select and simulating a down arrow keypress render', () => {
    const { container, getByText } = renderWithTheme(
      <Select options={OPTIONS} name="cities" />
    )

    selectEvent.openMenu(container.querySelector('#cities'))
    expect(getByText('Toronto')).toBeInTheDocument()
  })

  test('should return the schema on change event', async () => {
    const change = jest.fn()
    const { container } = renderWithTheme(
      <Select options={OPTIONS} name="cities" />
    )

    await selectEvent.select(container.querySelector('#cities'), 'Montreal')
    fireEvent.change(
      container.querySelector('#cities'),
      targetValueFactory('Montreal')
    )

    waitFor(() => {
      expect(change).toHaveBeenCalledTimes(2)
      expect(change).toHaveBeenCalledWith({
        target: { label: 'Montreal', value: 'Montreal' }
      })
    })
  })
})
