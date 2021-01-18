// Packages
import React from 'react'

// Styles
import * as S from './styles'
import * as L from 'layout'

const Footer = () => {
  return (
    <S.Wrapper>
      <L.Container>
        <p>
          Made with <S.Love>♥</S.Love> by{' '}
          <a href="https://mvfsillva.dev" target="blank">
            Marcus Silva
          </a>
        </p>
      </L.Container>
    </S.Wrapper>
  )
}

export default Footer
