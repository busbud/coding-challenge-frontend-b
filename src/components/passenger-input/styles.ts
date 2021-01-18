// Packages
import styled, { css } from 'styled-components'
import media from 'styled-media-query'

import { Box as Lbox } from 'layout/box'

export const Box = styled(Lbox)`
  > div {
    width: 15vw;
    margin-bottom: 0.5rem;
  }
  span {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
`

export const Wrapper = styled.div<{ borderless?: boolean }>`
  ${({ theme, borderless }) => css`
    cursor: pointer;
    box-sizing: border-box;
    box-shadow: ${!borderless && theme.shadow.small};
  `}
`

export const Placeholder = styled.div<{ maxWidth?: string }>`
  ${({ theme, maxWidth }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: ${theme.font.sizes.small};
    cursor: pointer;
    color: ${theme.colors.gray};
    padding: ${theme.spaces.tiny};
    max-width: 100%;
    > div {
      display: flex;
      align-items: center;
      > svg {
        margin-right: 1rem;
      }
    }
    ${media.greaterThan('medium')`
      max-width: ${maxWidth};
    `}
  `}
`

export const ContentWrapper = styled.div<{
  maxHeight: string | undefined
  maxWidth?: string
}>`
  ${({ theme, maxHeight, maxWidth }) => css`
    width: 100%;
    background-color: ${theme.colors.white};
    overflow: hidden;
    transition: ${theme.transition.ease};
    max-height: ${maxHeight || 0};
    max-width: 100%;
    padding: 0 1rem;
    padding-bottom: ${maxHeight && theme.spaces.tiny};

    & > * {
      transition: ${theme.transition.ease};
      opacity: ${maxHeight ? 1 : 0};
      margin-bottom: 0.5rem;
    }

    ${media.greaterThan('medium')`
      max-width: ${maxWidth};
    `}
  `}
`

export const Text = styled.label`
  ${({ theme }) => css`
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-weight: bold;
    font-size: ${theme.font.sizes.small};
  `}
`

export const Total = styled.span`
  ${({ theme }) => css`
    font-weight: bold;
    font-size: ${theme.font.sizes.small};
  `}
`
