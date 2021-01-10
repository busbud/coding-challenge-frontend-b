/* eslint-disable jest/no-mocks-import */
import React from "react";
import { render } from "@testing-library/react";

import "i18n";

import { AppContext } from "context";
import { MOCKED_CONTEXT } from "context/__mocks__";

import DeparturesList from "../";

describe("<DeparturesList />", () => {
  it("should render properly", () => {
    const { container } = render(
      <AppContext.Provider value={MOCKED_CONTEXT}>
        <DeparturesList />
      </AppContext.Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it("should render a load structure when the search is loading", () => {
    const contextValue = {
      departures: [],
      locations: [],
      operators: [],
      cities: [],
      loading: true,
      searched: true,
    };

    const { getByText } = render(
      <AppContext.Provider value={contextValue}>
        <DeparturesList />
      </AppContext.Provider>
    );

    expect(getByText("Searching for departures...")).toBeInTheDocument();
  });

  it("should render a not found message if the search return nothing", () => {
    const contextValue = {
      departures: null,
      locations: null,
      operators: null,
      cities: null,
      loading: false,
      searched: true,
    };

    const { getByText } = render(
      <AppContext.Provider value={contextValue}>
        <DeparturesList />
      </AppContext.Provider>
    );

    expect(
      getByText("Sorry, we didn't found departures for your search")
    ).toBeInTheDocument();
  });

  it("should render a error message if some of the arrays are missing", () => {
    const contextValue = {
      departures: [{ id: 1 }],
      locations: [{ id: 1 }],
      operators: [{ id: 1 }],
      cities: null,
      searched: true,
    };

    const { getByText } = render(
      <AppContext.Provider value={contextValue}>
        <DeparturesList />
      </AppContext.Provider>
    );

    expect(
      getByText("Something went wrong! Please try your search again.")
    ).toBeInTheDocument();
  });
});
