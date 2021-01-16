import styled, { css } from 'styled-components'

type BoxProps = {
  padding?: string
  border?: string
  margin?: string
  display?: string
  alignItems?: string
  justifyContent?: string
}

export const Box = styled.div<BoxProps>`
  ${({
    theme,
    padding,
    border,
    margin,
    display,
    alignItems,
    justifyContent
  }) => css`
    background-color: ${theme.colors.white};
    color: ${theme.colors.black};
    padding: ${padding};
    border: ${border};
    margin: ${margin};
    display: ${display};
    align-items: ${alignItems};
    justify-content: ${justifyContent};
  `}
`
