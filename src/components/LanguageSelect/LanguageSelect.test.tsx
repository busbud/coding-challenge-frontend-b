import React from 'react'
import { render } from 'test/components'
import LanguageSelect from './LanguageSelect'

describe.only('Logo', () => {
  it('renders Language Select', () => {
    const wrapper = render(<LanguageSelect />)

    wrapper.getByLabelText('Open Menu')
  })
})
