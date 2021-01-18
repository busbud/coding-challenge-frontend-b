// Packages
import styled, { css } from 'styled-components'
import { rgba } from 'polished'
import media from 'styled-media-query'

// Common Layout
import { Box as LBox } from 'layout/box'

export const Box = styled(LBox)`
  ${({ theme }) => css`
    flex-direction: column;
    > div {
      flex: 1 1 20px;
      margin: 0.5rem;
      width: 100%;
    }

    > button {
      height: 36px;
      width: 36px;
      margin: -18px;
      padding: 5px;
      transition: ${theme.transition.ease};
      z-index: 1;
      background: ${theme.colors.white};
      border: 1px solid ${rgba(theme.colors.muted, 1)};
      color: ${theme.colors.gray};
      font-size: ${theme.font.sizes.xmedium};

      :hover {
        border: 2px solid ${theme.colors.primary};
      }
    }

    .DayPicker {
      width: 100%;
    }

    ${media.greaterThan('medium')`
      flex-direction: row;
      > div {
        flex: 1 1 100px;
      }

      > button {
        width: 46px;
        height: 46px;
        margin: 11px -13px;
      }
    `}
  `}
`

export const Row = styled(LBox)`
  flex-direction: column;
  max-width: 100%;
  ${media.greaterThan('medium')`
    flex-direction: row;
    > div {
      max-width: 32%;
    }
  `}
`

export const FloatButton = styled.div`
  ${({ theme }) => css`
    left: 0;
    position: absolute;
    text-align: center;
    width: 100%;
    margin-top: 1.2rem;

    > button {
      font-size: ${theme.font.sizes.small};
      box-shadow: ${theme.shadow.medium};
    }

    svg {
      margin-right: ${theme.spaces.xxsmall};
    }
  `}
`
