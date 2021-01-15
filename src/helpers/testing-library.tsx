// Packages
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { render } from '@testing-library/react'

// Theme
import theme from 'styles/theme'

export const renderWithTheme = (children) =>
  render(<ThemeProvider theme={theme}>{children}</ThemeProvider>)
