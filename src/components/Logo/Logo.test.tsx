import React from 'react'

import { render } from 'test/components'
import { StyledLogo } from './Logo'

describe('Logo', () => {
  it('renders SVG Busbud Logo', () => {
    const wrapper = render(<StyledLogo />)

    wrapper.getByLabelText('Busbud.com')
  })
})
