import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Menu } from 'grommet'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { LanguageDomain } from '../../domain/language/'

const ActiveMenu = styled.div`
  color: ${(props) => props.theme.colors.blue};
  font-weight: 700;
`
const LanguageSelect = () => {
  const { locale } = useRouter()

  const currentLang = LanguageDomain.getLangId(
    locale as LanguageDomain.Language
  )

  const items = LanguageDomain.languages.map((lang) => {
    let label
    if (lang.id === currentLang) {
      label = (
        <ActiveMenu>
          <FormattedMessage id={`lang.${lang.id}`} />
        </ActiveMenu>
      )
    } else {
      label = <FormattedMessage id={`lang.${lang.id}`} />
    }
    return {
      label,
      href: `/${lang.code}`,
    }
  })

  return (
    <Menu
      label={<FormattedMessage id={`lang.${currentLang}`} />}
      items={items}
    />
  )
}

export default LanguageSelect
