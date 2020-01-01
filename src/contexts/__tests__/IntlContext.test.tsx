import React from "react";
import { render } from "@testing-library/react";
import { IntlContext } from "./../IntlContext";

describe("IntlContext", () => {
  test("shows default value", () => {
    const { getByText } = render(
      <IntlContext.Provider value={{ lang: "fr", setLanguage: jest.fn() }}>
        <IntlContext.Consumer>
          {value => <span>{value.lang}</span>}
        </IntlContext.Consumer>
      </IntlContext.Provider>
    );
    expect(getByText("fr")).toBeInTheDocument();
  });
});
