import styled, { css } from 'styled-components'
import media from 'styled-media-query'
import { darken } from 'polished'

type Props = {
  rounded?: boolean
  circle?: boolean
  primary?: boolean
  secondary?: boolean
  skyBlue?: boolean
  disabled?: boolean
}

const modifiers = {
  rounded: (theme) => css`
    border-radius: ${theme.border.rounded};
    ${media.greaterThan('medium')`
      padding: 1.3rem ${theme.spaces.large};
    `}
  `,
  circle: (theme) => css`
    border-radius: ${theme.border.circle};
    width: 32px;
    height: 32px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  primary: (theme) => css`
    background-color: ${theme.colors.primary};
    &:hover {
      background: ${darken(0.1, theme.colors.primary)};
    }
  `,
  secondary: (theme) => css`
    background-color: ${theme.colors.secondary};
    &:hover {
      background: ${darken(0.1, theme.colors.secondary)};
    }
  `,
  skyBlue: (theme) => css`
    background-color: ${theme.colors.blue};
    &:hover {
      background: ${darken(0.1, theme.colors.blue)};
    }
  `,
  disabled: (theme) => css`
    background-color: ${theme.colors.muted};
    cursor: not-allowed;
    &:hover {
      background: ${darken(0.1, theme.colors.muted)};
    }
  `
}

export const ButtonWrapper = styled.button<Props>`
  ${({ theme, rounded, circle, primary, secondary, skyBlue, disabled }) => css`
    background-color: ${theme.colors.gray};
    border-radius: ${theme.border.radius};
    color: ${theme.colors.white};
    padding: 1rem ${theme.spaces.small};
    font-size: ${theme.font.sizes.base};
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
    transition: ${theme.transition.ease};

    ${rounded && modifiers.rounded(theme)};
    ${circle && modifiers.circle(theme)};
    ${primary && modifiers.primary(theme)};
    ${secondary && modifiers.secondary(theme)};
    ${skyBlue && modifiers.skyBlue(theme)};
    ${disabled && modifiers.disabled(theme)};
  `}
`
