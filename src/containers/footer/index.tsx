// Packages
import React from 'react'
import { useTranslation } from 'react-i18next'

// Styles
import * as S from './styles'
import * as L from 'layout'

const Footer = () => {
  const { t } = useTranslation()
  return (
    <S.Wrapper>
      <L.Container>
        <p>
          {t('footer_message')} <S.Love>♥</S.Love> {t('footer_message_by')}{' '}
          <a href="https://mvfsillva.dev" target="blank">
            Marcus Silva
          </a>
        </p>
      </L.Container>
    </S.Wrapper>
  )
}

export default Footer
