import App from "next/app";
import React from "react";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "../components/common-styled/GlobalStyle";
import theme from "../components/common-styled/Theme";

export const IntlContext = React.createContext("en");

export default class MyApp extends App {
  constructor(props) {
    super(props);

    this.toggleLanguage = language => {
      window.localStorage.setItem("locale", language);
      this.setState({
        language
      });
    };

    this.state = {
      language: null,
      toggleLanguage: this.toggleLanguage
    };
  }

  componentDidMount() {
    this.setState({
      language: window.localStorage.getItem("locale") || "en"
    });
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme.default}>
        <IntlContext.Provider value={this.state}>
          <GlobalStyle />
          <Component {...pageProps} />
        </IntlContext.Provider>
      </ThemeProvider>
    );
  }
}
