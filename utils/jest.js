import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

import { IntlContext } from "../pages/_app";
import theme from "../components/common-styled/Theme";

export const setupComponent = (
  component,
  toggleLanguage = jest.fn(),
  language = "en"
) => {
  return render(
    <ThemeProvider theme={theme.default}>
      <IntlContext.Provider
        value={{
          language,
          toggleLanguage
        }}
      >
        {component}
      </IntlContext.Provider>
    </ThemeProvider>
  );
};
