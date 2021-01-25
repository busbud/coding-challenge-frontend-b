import React from 'react'
import { Menu } from 'grommet'

const LanguageSelect = () => (
  <Menu
    label="Language"
    items={[
      { label: 'English', href: '/' },
      { label: 'Portuguese', href: '/pt' },
    ]}
  />
)

export default LanguageSelect
