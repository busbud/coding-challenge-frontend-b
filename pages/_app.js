import App from 'next/app'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { useRouter } from 'next/dist/client/router'

const theme = {
  colors: {
    primary: '#0070f3'
  }
}

export const IntlContext = React.createContext('en');

export default class MyApp extends App {
  constructor(props) {
    super(props);

    this.toggleLanguage = (language) => {
      window.localStorage.setItem('language', language)
      this.setState({
        language
      });
    };

    this.state = {
      language: null,
      toggleLanguage: this.toggleLanguage,
    };
  }

  componentDidMount() {
    this.setState({
      language: window.localStorage.getItem('language') || 'en'
    });
  }

  render () {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <IntlContext.Provider value={this.state}>
          <Component {...pageProps} />
        </IntlContext.Provider>
      </ThemeProvider>
    )
  }
}