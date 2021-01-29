import React from 'react'
import { render } from 'test/components'
import LanguageSelect from '../LanguageSelect'

describe('Language Select', () => {
  it('renders English as selected Language', () => {
    const wrapper = render(<LanguageSelect />)
    expect(wrapper.getByTestId('MENU.SELECT')).toHaveTextContent('English')
  })
})
