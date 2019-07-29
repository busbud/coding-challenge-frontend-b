import React from 'react'
import Styled from 'styled-components'
import HeaderLogo from './HeaderLogo'
import HeaderLanguageMenu from './HeaderLanguageMenu'

const Header = Styled.div`
  align-items: center;
  display: flex;
  justify-content: space-around;
  padding: 5%;
  width: 100%;
`
export default () => {
  return (
    <Header>
      <HeaderLogo />
      <HeaderLanguageMenu />
    </Header>
  )
}
