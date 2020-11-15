import "./App.css";
import "./i18n";
import { ResultsList, SearchParams, TopAppBar } from "./components";
import { connect } from "react-redux";
import React from "react";
import { theme } from "./theme";
import { ThemeProvider } from "@material-ui/core";

const App = (): React.ReactElement<typeof ThemeProvider> => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <TopAppBar />
        <SearchParams />
        <ResultsList />
      </div>
    </ThemeProvider>
  );
};

// NOTE: This is one of a few exceptions this to this rule TRB 2020-11-14
// eslint-disable-next-line import/no-default-export
export default connect()(App);
