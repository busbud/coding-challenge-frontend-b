import React from "react";
import flushPromises from "flush-promises";
import { render, fireEvent, act } from "@testing-library/react";

import "i18n";

import SearchForm from "../";

// Date.now = jest.fn(() => 1610206111944); //01.09.2021

const mockedOnSearch = jest.fn();

describe("<SearchForm />", () => {
  it("should render properly", () => {
    const { container } = render(<SearchForm onSearch={mockedOnSearch} />);
    expect(container).toMatchSnapshot();
  });

  it("should handle the onSearch", async () => {
    const { baseElement, queryByTestId, queryByText } = render(
      <SearchForm onSearch={mockedOnSearch} />
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

    expect(mockedOnSearch).toHaveBeenCalledWith({
      originCity: "f2m673",
      destinationCity: "f25dvk",
      outboundDate: "2021-01-10",
      passengers: "1",
    });
  });
});
