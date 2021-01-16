// Packages
import styled, { css } from 'styled-components'

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

export const Placeholder = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: ${theme.font.sizes.base};
    cursor: pointer;
    color: ${theme.colors.gray};
    padding: ${theme.spaces.tiny};
    > div {
      display: flex;
      align-items: center;
      > svg {
        margin-right: 1rem;
      }
    }
  `}
`

export const IconRotate = styled.div<{ turn: boolean }>`
  ${({ theme, turn }) => css`
    background-color: transparent;
    margin-top: auto;
    margin-bottom: auto;
    transform: ${turn && 'rotate(-180deg)'};
    transform-origin: 50% 50%;
    transition: ${theme.transition.ease};
    svg {
      color: ${theme.colors.gray};
    }
  `}
`

export const ContentWrapper = styled.div<{ maxHeight: string | undefined }>`
  ${({ theme, maxHeight }) => css`
    width: 100%;
    background-color: ${theme.colors.white};
    overflow: hidden;
    transition: ${theme.transition.ease};
    max-height: ${maxHeight || 0};
    padding: 0 1rem;
    padding-bottom: ${maxHeight && theme.spaces.tiny};

    & > * {
      transition: ${theme.transition.ease};
      opacity: ${maxHeight ? 1 : 0};
      margin-bottom: 0.5rem;
    }
  `}
`

export const Text = styled.span`
  width: 5vw;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-weight: bold;
`
