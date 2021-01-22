import React from 'react'
import { render } from '@testing-library/react'
import Logo from './Logo'

describe('Logo', () => {
  it('renders SVG Busbud Logo', () => {
    const wrapper = render(<Logo />)

    wrapper.getByLabelText('Busbud.com')
  })
})
