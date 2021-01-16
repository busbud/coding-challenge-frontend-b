// Packages
import styled, { css } from 'styled-components'

import * as L from 'layout'

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

export const TriggerWrapper = styled(L.Cluster)`
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    transition: ${theme.transition.ease};
  `}
`

export const Wrapper = styled(L.Box)<{ withBorder?: boolean }>`
  ${({ theme, withBorder }) => css`
    border: ${withBorder && `1px solid ${theme.colors.muted}`};
    padding: 1rem;
    cursor: pointer;
    box-sizing: border-box;
    box-shadow: ${theme.shadow.small};
  `}
`
