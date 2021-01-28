import React from 'react'
import { Grommet } from 'grommet'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'

import { styledTheme, ThemeType } from '../styles/theme'
import { grommetTheme } from '../styles/grommetTheme'

const renderStyled = ({
  theme = styledTheme,
  children,
}: {
  theme?: ThemeType
  children: React.ReactChild
}) =>
  render(
    <Grommet theme={grommetTheme as any}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Grommet>
  )

export default renderStyled
