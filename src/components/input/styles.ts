// Packages
import { ReactElement } from 'react'
import styled, { css } from 'styled-components'
import { rgba } from 'polished'

export const Container = styled.div`
  ${({ theme }) => css`
    > input {
      padding-left: calc(${theme.spaces.small} - 4px);
    }
  `}
`

export const Icon = styled.div`
  position: absolute;
  padding: 12px;
  pointer-events: none;
`

export const Field = styled.input<{ disabled?: boolean; icon?: ReactElement }>`
  ${({ theme, disabled }) => css`
    background-color: ${disabled && theme.colors.muted};
    border-radius: ${theme.border.radius};
    border-width: 0px;
    bottom: 0px;
    box-shadow: 0 0 0 1px ${rgba(theme.colors.gray, 1)};
    display: block;
    font-size: calc(${theme.font.sizes.base} - 1px);
    outline: 0;
    color: ${theme.colors.darkGray};
    padding: ${theme.spaces.tiny};

    ::placeholder {
      color: ${theme.colors.darkGray};
    }

    :hover {
      box-shadow: 0 0 0 2px ${rgba(theme.colors.gray, 0.3)};
    }

    :focus,
    :active {
      box-shadow: 0 0 0 2px ${rgba(theme.colors.gray, 0.3)};
    }
  `}
`
