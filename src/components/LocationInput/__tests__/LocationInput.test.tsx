import React from 'react'
import LocationInput from '../LocationInput'
import { render } from 'test/components'
import { screen, fireEvent } from '@testing-library/react'

describe('LocationInput', () => {
  const props = {
    textInput: {
      value: 'Test Value',
      onChange: jest.fn(),
      onSelect: jest.fn(),
    },
  }
  it('render properly', () => {
    render(<LocationInput {...props} />)
    expect(screen.getByTestId('LOCATION.INPUT')).toMatchSnapshot()
  })
})
