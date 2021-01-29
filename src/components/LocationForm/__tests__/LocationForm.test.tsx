import React from 'react'
import LocationForm from '../LocationForm'
import { render } from 'test/components'
import { screen, fireEvent } from '@testing-library/react'
import { initialState } from '../../../store/search'
describe('LocationForm', () => {
  it('renders correct', () => {
    render(<LocationForm />, {
      initialState: {
        search: {
          form: {
            ...initialState.form,
            outboundDate: new Date('2022-10-22T00:00Z').toISOString(),
          },
        },
      },
    })
    expect(screen.getByTestId('LOCATION.CONTAINER')).toMatchSnapshot()
  })
})
