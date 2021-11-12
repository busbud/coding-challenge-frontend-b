/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app'

import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { DestinationProvider } from '../hooks/useDestination'
import { theme } from '../styles/theme'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Helvetica', sans-serif;
  }
`

const Content = styled.main`
  margin: 16px 32px;
`

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Content>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <DestinationProvider>
          <Component {...pageProps} />
        </DestinationProvider>
      </ThemeProvider>
    </Content>
  )
}

export default MyApp
