import { AppProps, AppContext } from 'next/app'
import { Grommet } from 'grommet'
import { ThemeProvider } from 'styled-components'
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'

import { styledTheme } from '../styles/theme'
import { grommetTheme } from '../styles/grommetTheme'
import { getMessages } from '../lang/locale'
import { Language } from '../domain/language/Language'
import configureAppStore from '../store'
import { getLocationCurrency } from '../domain/currency/Currency'
import { initialState as SearchInitialState } from '../store/search'
import '../styles/globals.css'

const App = ({ Component, pageProps, router }: AppProps) => {
  const { locale, defaultLocale } = router
  const { messages } = pageProps
  const currency = getLocationCurrency(locale as Language)

  const preloadedState = {
    currency: { value: getLocationCurrency(locale as Language) },
    search: {
      form: {
        ...SearchInitialState.form,
        lang: locale,
        currency: currency,
      },
    },
  }

  return (
    <Provider store={configureAppStore(preloadedState)}>
      <IntlProvider
        messages={messages}
        locale={locale as Language}
        defaultLocale={defaultLocale}
      >
        <Grommet theme={grommetTheme}>
          <ThemeProvider theme={styledTheme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </Grommet>
      </IntlProvider>
    </Provider>
  )
}

App.getInitialProps = async (ctx: AppContext) => {
  const { locale } = ctx.router
  const messages = await getMessages(locale as Language)
  return {
    pageProps: {
      messages,
    },
  }
}
export default App
