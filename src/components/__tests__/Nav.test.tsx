import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { IntlProvider } from "react-intl";

import Nav from "./../Nav";
import { IntlContext } from "./../../contexts/IntlContext";
import messages from "./../../i18n/messages/en.json";

afterEach(cleanup);

describe("Nav", () => {
  describe("Languages", () => {
    test("onClick should call the provider", () => {
      const setLanguage = jest.fn();

      const { getByAltText } = render(
        <IntlContext.Provider
          value={{
            lang: "en",
            setLanguage
          }}
        >
          <IntlProvider locale="en" messages={messages}>
            <Nav />
          </IntlProvider>
        </IntlContext.Provider>
      );

      fireEvent.click(getByAltText("fr"));
      expect(setLanguage).toHaveBeenCalledWith("fr");
    });
    test("renders languages links", () => {
      const { getByAltText } = render(
        <IntlContext.Provider
          value={{
            lang: "en",
            setLanguage: (_lang: string) => {}
          }}
        >
          <IntlProvider locale="en" messages={messages}>
            <Nav />
          </IntlProvider>
        </IntlContext.Provider>
      );
      const enFlag = getByAltText("en");
      const frFlag = getByAltText("fr");
      expect(enFlag).toBeInTheDocument();
      expect(frFlag).toBeInTheDocument();
    });

    test("renders a link to Home", () => {
      const { getByText } = render(
        <IntlContext.Provider
          value={{
            lang: "en",
            setLanguage: (_lang: string) => {}
          }}
        >
          <IntlProvider locale="en" messages={messages}>
            <Nav />
          </IntlProvider>
        </IntlContext.Provider>
      );
      const homeLink = getByText("Home");
      expect(homeLink).toBeInTheDocument();
    });
  });
});
