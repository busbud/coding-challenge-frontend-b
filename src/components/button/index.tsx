// Packages
import React from 'react'

// Styles
import * as S from './styles'

type Props = {
  children: React.ReactNode
  rounded?: boolean
  circle?: boolean
  primary?: boolean
  secondary?: boolean
  skyBlue?: boolean
  onClick: () => void
  type?: string
}

const Button: React.FC<Props> = ({
  children,
  rounded,
  circle,
  primary,
  secondary,
  skyBlue,
  type = 'button',
  onClick
}) => (
  <S.ButtonWrapper
    rounded={rounded}
    circle={circle}
    primary={primary}
    secondary={secondary}
    skyBlue={skyBlue}
    onClick={onClick}
    type={type}
    data-testid="button"
  >
    {children}
  </S.ButtonWrapper>
)

export default Button
