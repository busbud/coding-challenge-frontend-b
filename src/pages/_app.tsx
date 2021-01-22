import { AppProps } from 'next/app'
import { Grommet } from 'grommet'
import { ThemeProvider } from 'styled-components'

import { styledTheme } from '../styles/theme'
import { grommetTheme } from '../styles/grommetTheme'

import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Grommet theme={grommetTheme}>
      <ThemeProvider theme={styledTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Grommet>
  )
}
