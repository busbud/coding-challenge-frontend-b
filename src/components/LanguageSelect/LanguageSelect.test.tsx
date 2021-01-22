import React from 'react'
import { render } from '@testing-library/react'
import LanguageSelect from './LanguageSelect'

describe('Logo', () => {
  it('renders Language Select', () => {
    const wrapper = render(<LanguageSelect />)

    wrapper.getByLabelText('Open Menu')
  })
})
