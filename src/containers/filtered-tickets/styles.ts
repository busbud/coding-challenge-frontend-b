// Packages
import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    margin: ${theme.spaces.tiny};
    ${media.greaterThan('medium')`
      section {
        width: min(110rem, 100%);
      }
    `}
  `}
`

export const Image = styled.img`
  width: min(15rem, 100%);

  ${media.greaterThan('medium')`
    margin: 0;
    width: min(18rem, 100%);
  `}
`

export const BusInfo = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: center;
    column-gap: ${theme.spaces.small};
    row-gap: ${theme.spaces.small};
    font-size: calc(${theme.spaces.xsmall} - 2px);

    .svg__circle {
      margin: 0 16px;
      width: 0.5rem;
    }

    ${media.greaterThan('small')`
      grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
    `}
  `}
`

export const Text = styled.span<{ bold?: boolean; margin?: string }>`
  ${({ theme, bold, margin }) => css`
    font-size: ${theme.font.sizes.xxxsmall};
    line-height: ${theme.font.sizes.small};
    font-weight: ${bold && 500};
    margin: ${margin};
  `}
`

export const Title = styled.h1`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xmedium};
    line-height: ${theme.font.sizes.medium};
    font-weight: 500;
    text-align: center;
    margin-bottom: ${theme.spaces.large};
    ${media.greaterThan('medium')`
      font-size: ${theme.font.sizes.large};
    `};
  `}
`

export const ContentEmptyState = styled(Wrapper)`
  ${media.greaterThan('medium')`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `};
`

export const EmptyState = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr;
    column-gap: ${theme.spaces.small};
    row-gap: ${theme.spaces.small};
    font-size: calc(${theme.spaces.xsmall} - 2px);

    ${media.greaterThan('medium')`
       grid-template-columns: 1fr 1fr;
    `};
  `}
`
