import React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { I18nextProvider } from 'react-i18next'

import theme from 'styles/theme'
import GlobalStyle from 'styles/global-styles'

import i18n from 'i18n/config'

const App = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={theme}>
    <I18nextProvider i18n={i18n}>
      <Head>
        <meta name="theme-color" content="#FBAE16" />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </I18nextProvider>
  </ThemeProvider>
)

export default App
