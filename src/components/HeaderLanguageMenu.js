import React from 'react'
import Styled from 'styled-components'
import HeaderLanguageMenuBtn from './HeaderLanguageMenuBtn'

const HeaderLanguageMenu = Styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`
export default () => (
  <HeaderLanguageMenu>
    <HeaderLanguageMenuBtn>EN</HeaderLanguageMenuBtn>/
    <HeaderLanguageMenuBtn>FR</HeaderLanguageMenuBtn>
  </HeaderLanguageMenu>
)
