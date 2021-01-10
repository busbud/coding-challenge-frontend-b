import React from "react";
import axios from "axios";
import flushPromises from "flush-promises";
import { render, fireEvent, act } from "@testing-library/react";

import "i18n";
import i18n from "i18n";
import { AppContext } from "context";

import Header from "../";

const departures = [{ name: "mocked departures" }];
const locations = [{ name: "mocked locations" }];
const operators = [{ name: "mocked operators" }];
const cities = [{ name: "mocked cities" }];

describe("<Header />", () => {
  it("should render properly", () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });

  it("should update context with searched data", async () => {
    axios.get = jest.fn(() =>
      Promise.resolve({
        data: {
          complete: true,
          departures,
          locations,
          operators,
          cities,
        },
      })
    );

    const contextValue = {
      setLoading: jest.fn(),
      setSearched: jest.fn(),
      setDepartures: jest.fn(),
      setLocations: jest.fn(),
      setOperators: jest.fn(),
      setCities: jest.fn(),
    };
    const { queryByTestId, queryByText, baseElement } = render(
      <AppContext.Provider value={contextValue}>
        <Header />
      </AppContext.Provider>
    );
    const originCitySelect = queryByTestId("origin-city-select");
    const destinationCitySelect = queryByTestId("destination-city-select");
    const passengersSelect = queryByTestId("passengers-select");
    const datePicker = queryByTestId("outbound-date-picker");

    await act(async () => {
      fireEvent.mouseDown(originCitySelect.firstElementChild);
      await flushPromises();
      fireEvent.click(queryByText("Québec"));
    });

    await act(async () => {
      fireEvent.mouseDown(destinationCitySelect.firstElementChild);
      await flushPromises();
      fireEvent.click(queryByText("Montréal"));
    });

    await act(async () => {
      fireEvent.mouseDown(passengersSelect.firstElementChild);
      await flushPromises();
      fireEvent.click(queryByText("1 adult"));
    });

    await act(async () => {
      fireEvent.mouseDown(datePicker);
      await flushPromises();
      fireEvent.change(datePicker, { target: { value: "2021-01-10" } });
      fireEvent.click(baseElement.querySelector(".ant-picker-cell-selected"));
    });

    fireEvent.click(queryByTestId("search-button"));

    expect(contextValue.setLoading).toHaveBeenCalledWith(true);
    expect(contextValue.setSearched).toHaveBeenCalledWith(true);

    await flushPromises();

    expect(contextValue.setLoading).toHaveBeenCalledWith(false);
    expect(contextValue.setDepartures).toHaveBeenCalledWith(departures);
    expect(contextValue.setLocations).toHaveBeenCalledWith(locations);
    expect(contextValue.setOperators).toHaveBeenCalledWith(operators);
    expect(contextValue.setCities).toHaveBeenCalledWith(cities);
  });

  it("should change the language", async () => {
    i18n.changeLanguage = jest.fn();

    const { queryByTestId, queryByText } = render(<Header />);
    const languageSelect = queryByTestId("language-select");

    await act(async () => {
      fireEvent.mouseDown(languageSelect.firstElementChild);
      await flushPromises();
      fireEvent.click(queryByText("Français"));
    });

    expect(i18n.changeLanguage).toHaveBeenCalledWith("fr");
  });
});
