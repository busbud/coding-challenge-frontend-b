import React from 'react'

import renderStyled from '../../test-support/renderStyled'
import Logo from './Logo'

describe('Logo', () => {
  it('renders SVG Busbud Logo', () => {
    const wrapper = renderStyled({ children: <Logo /> })

    wrapper.getByLabelText('Busbud.com')
  })
})
