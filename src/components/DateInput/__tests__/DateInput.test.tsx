import React from 'react'
import DateInput from '../DateInput'
import { DateDomain } from '../../../domain/language'
import { render, screen, fireEvent } from 'test/components'

describe('DateInput', () => {
  const todaySplit = new Date('10/22/2022')
    .toISOString()
    .split('T')[0]
    .split('-')
  const today = `${parseInt(todaySplit[1])}/${todaySplit[2]}/${todaySplit[0]}`

  it('renders the input with actual date', () => {
    const wrapper = render(
      <DateInput value={today} onChange={(event) => jest.fn()} />
    )
    expect(wrapper.getByTestId('INPUT.DATE')).toHaveValue(today)
  })

  it('matchs the snapshot', () => {
    const wrapper = render(
      <DateInput value={today} onChange={(event) => jest.fn()} />
    )
    expect(wrapper.getByTestId('INPUT.DATE')).toMatchSnapshot()
  })
})
