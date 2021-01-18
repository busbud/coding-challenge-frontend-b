import React from 'react'

import * as S from './styles'

interface Props {
  title: string
  subTitle: string
  children?: React.ReactNode
}

const Chip: React.FC<Props> = ({ title, subTitle, children }) => (
  <S.Card data-testid="chip">
    <S.TitleWrapper>
      <S.Title>{title}</S.Title>
      <S.SubTitle>{subTitle}</S.SubTitle>
    </S.TitleWrapper>

    <S.Content>{children}</S.Content>
  </S.Card>
)

export default Chip
