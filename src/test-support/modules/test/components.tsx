import React, { ReactNode, ReactElement, ComponentType } from 'react'
import { Provider } from 'react-redux'
import { createStore, PreloadedState } from 'redux'
import * as Testing from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { IntlProvider } from 'react-intl'
import { Grommet } from 'grommet'

import * as defaultLocaleMessages from '../../../../lang/en.json'
import { styledTheme } from '../../../styles/theme'
import { grommetTheme } from '../../../styles/grommetTheme'
import { State } from '../../../store'
import rootReducer from '../../../store/rootReducer'

import '@formatjs/intl-listformat/polyfill'
import '@formatjs/intl-listformat/locale-data/en-US'

export * from '@testing-library/react'

type Props = {
  children?: ReactNode
}

type CustomOptions = {
  initialState: PreloadedState<State>
}

export const render = (
  component: ReactElement,
  options: CustomOptions = { initialState: {} }
) => {
  const store = createStore(rootReducer, options?.initialState)

  const AllProviders = ({ children }: Props) => (
    <Provider store={store}>
      <Grommet theme={grommetTheme as any}>
        <ThemeProvider theme={styledTheme}>
          <IntlProvider locale="en-US" messages={defaultLocaleMessages}>
            <>{children}</>
          </IntlProvider>
        </ThemeProvider>
      </Grommet>
    </Provider>
  )

  return Testing.render(component, {
    wrapper: AllProviders as ComponentType,
    ...options,
  })
}
