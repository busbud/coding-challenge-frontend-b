import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'

import { styledTheme, ThemeType } from '../styles/theme'

const renderStyled = ({
  theme = styledTheme,
  children,
}: {
  theme?: ThemeType
  children: React.ReactChild
}) => render(<ThemeProvider theme={theme}>{children}</ThemeProvider>)

export default renderStyled
