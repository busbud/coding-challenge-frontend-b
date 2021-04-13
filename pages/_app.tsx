import '../assets/styles/styles.scss'
import AppWrapper from '../components/AppWrapper'

import type { AppProps /*, AppContext */ } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  )
}
