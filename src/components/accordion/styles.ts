// Packages
import styled, { css } from 'styled-components'

interface ClusterProps {
  noWrap?: boolean
  align?: string
  justify?: string
  space?: string
  showOverflow?: boolean
}

export interface BoxProps {
  padding?: string
  border?: string
}

export const Cluster = styled.div<ClusterProps>`
  ${({ showOverflow, noWrap, align, space, justify }) => css`
    overflow: ${showOverflow && 'hidden'};

    & > * {
      display: flex;
      flex-wrap: ${noWrap && 'wrap'};
      justify-content: ${justify};
      align-items: ${align};
      margin: calc(${space} / 2 * -1);
    }

    & > * > * {
      margin: calc(${space} / 2);
    }
  `}
`

export const Box = styled.div<BoxProps>`
  ${({ theme, padding, border }) => css`
    background-color: ${theme.colors.white};
    color: ${theme.colors.black};
    padding: ${padding};
    border: ${border};
  `}
`

export const TurnIcon = styled.div<{ turn: boolean }>`
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

export const Divider = styled.div`
  ${({ theme }) => css`
    width: 100%;
    border-bottom: 0.5px solid ${theme.colors.muted};
  `}
`

export const ContentWrapper = styled.div<{ maxHeight: string | undefined }>`
  ${({ theme, maxHeight }) => css`
    background-color: ${theme.colors.white};
    overflow: hidden;
    transition: ${theme.transition.ease};
    max-height: ${maxHeight || 0};

    & > * {
      transition: ${theme.transition.ease};
      opacity: ${maxHeight ? 1 : 0};
    }
  `}
`

export const TriggerWrapper = styled(Cluster)`
  ${({ theme }) => css`
    background-color: ${theme.colors.black};
    transition: ${theme.transition.ease};
  `}
`

export const Wrapper = styled(Box)<{ withBorder?: boolean }>`
  ${({ theme, withBorder }) => css`
    border: ${withBorder && `1px solid ${theme.colors.muted}`};
    padding: 1rem;
    cursor: pointer;
    box-sizing: border-box;
    border-radius: ${theme.border.radius};
  `}
`
