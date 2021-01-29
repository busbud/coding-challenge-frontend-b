import React from 'react'
import LocationSwitch from '../LocationSwitch'
import { render } from 'test/components'
import { screen, fireEvent } from '@testing-library/react'

describe('LocationSwitch', () => {
  it('calls onClick function properly', () => {
    const mock = jest.fn()
    render(<LocationSwitch onClick={mock} />)
    fireEvent.click(screen.getByTestId('PLACE_SWITCH'))

    expect(mock).toBeCalled()
    expect(mock).toBeCalledTimes(1)
  })
})
