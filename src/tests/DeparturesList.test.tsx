import React from "react";
import ReactDOM from "react-dom";
import DeparturesList from "../components/DeparturesList";
import { Provider } from "react-redux";
import store from "../store";
import { mockDeparture, mockLocation, mockOperator, mockCity } from "./mocks";
import renderer from "react-test-renderer";

import configureStore from "redux-mock-store";

const mockStore = configureStore();

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <DeparturesList
        selectText="Search"
        priceSortText="Sort by price"
        timeSortText="Sort by time"
      />
    </Provider>,
    div
  );
});

it("renders a list when loadDepartures() is fired", () => {
  const store = mockStore({
    language: "en",
    searching: false,
    departures: [mockDeparture],
    locations: [mockLocation],
    operators: [mockOperator],
    cities: [mockCity],
    error: ""
  });
  const result = renderer
    .create(
      <Provider store={store}>
        <DeparturesList
          selectText="Search"
          priceSortText="Sort by price"
          timeSortText="Sort by time"
        />
      </Provider>
    )
    .toJSON();
  expect(result).toMatchSnapshot();
});

it("renders 'Searching...' when searching=true", () => {
  const store = mockStore({
    language: "en",
    searching: true,
    departures: [],
    locations: [],
    operators: [],
    cities: [],
    error: ""
  });
  const result = renderer
    .create(
      <Provider store={store}>
        <DeparturesList
          selectText="Search"
          priceSortText="Sort by price"
          timeSortText="Sort by time"
        />
      </Provider>
    )
    .toJSON();
  expect(result).toMatchSnapshot();
});

it("renders 'Searching...' when searching=true, despite departures being loaded", () => {
  const store = mockStore({
    language: "en",
    searching: true,
    departures: [mockDeparture],
    locations: [mockLocation],
    operators: [mockOperator],
    cities: [mockCity],
    error: ""
  });
  const result = renderer
    .create(
      <Provider store={store}>
        <DeparturesList
          selectText="Search"
          priceSortText="Sort by price"
          timeSortText="Sort by time"
        />
      </Provider>
    )
    .toJSON();
  expect(result).toMatchSnapshot();
});

it("renders error message when there's an error", () => {
  const store = mockStore({
    language: "en",
    searching: false,
    departures: [mockDeparture],
    locations: [mockLocation],
    operators: [mockOperator],
    cities: [mockCity],
    error: "Test error message"
  });
  const result = renderer
    .create(
      <Provider store={store}>
        <DeparturesList
          selectText="Search"
          priceSortText="Sort by price"
          timeSortText="Sort by time"
        />
      </Provider>
    )
    .toJSON();
  expect(result).toMatchSnapshot();
});

it("Does not try to render list if departures are loaded, but other data such as locations isn't", () => {
  const store = mockStore({
    language: "en",
    searching: false,
    departures: [mockDeparture],
    locations: [],
    operators: [],
    cities: [],
    error: ""
  });
  const result = renderer
    .create(
      <Provider store={store}>
        <DeparturesList
          selectText="Search"
          priceSortText="Sort by price"
          timeSortText="Sort by time"
        />
      </Provider>
    )
    .toJSON();
  expect(result).toMatchSnapshot();
});
