import React from "react";
import { mount, shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import Departure from "../components/Departure";

import { departures } from "../lib/testData";

const {
  origin_city,
  origin_location,
  destination_city,
  destination_location,
  operator,
  departure_time,
  arrival_time,
  prices
} = departures[0];

jest.mock("react-i18next", () => ({
  withTranslation: () => Component => {
    Component.defaultProps = {
      ...Component.defaultProps,
      i18n: { language: "en" },
      t: key => key
    };
    return Component;
  }
}));

describe("<Departure />", () => {
  it("renders and matches the snapshot", () => {
    const wrapper = shallow(
      <Departure
        origin_location={origin_location}
        origin_city={origin_city}
        destination_location={destination_location}
        destination_city={destination_city}
        operator={operator}
        departure_time={departure_time}
        arrival_time={arrival_time}
        prices={prices}
      />
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("displays the departure info", () => {
    const wrapper = mount(
      <Departure
        origin_location={origin_location}
        origin_city={origin_city}
        destination_location={destination_location}
        destination_city={destination_city}
        operator={operator}
        departure_time={departure_time}
        arrival_time={arrival_time}
        prices={prices}
      />
    );

    const departureTime = wrapper.find(".departure-time");
    expect(departureTime.text()).toBe("01:30 AM");
    const arrivalTime = wrapper.find(".arrival-time");
    expect(arrivalTime.text()).toBe("08:30 AM");
    const price = wrapper.find(".price");
    expect(price.text()).toBe("$52.00 CAD");
  });

  it("displays the origin city and location info", () => {
    const wrapper = mount(
      <Departure
        origin_location={origin_location}
        origin_city={origin_city}
        destination_location={destination_location}
        destination_city={destination_city}
        operator={operator}
        departure_time={departure_time}
        arrival_time={arrival_time}
        prices={prices}
      />
    );

    const originCityName = wrapper.find(".origin-city-name");
    expect(originCityName.text()).toBe("New York");
    const originLocationName = wrapper.find(".origin-location-name");
    expect(originLocationName.text()).toBe("Port Authority");
  });

  it("displays the destination city and location info", () => {
    const wrapper = mount(
      <Departure
        origin_location={origin_location}
        origin_city={origin_city}
        destination_location={destination_location}
        destination_city={destination_city}
        operator={operator}
        departure_time={departure_time}
        arrival_time={arrival_time}
        prices={prices}
      />
    );

    const destinationCityName = wrapper.find(".destination-city-name");
    expect(destinationCityName.text()).toBe("Montreal");
    const destinationLocationName = wrapper.find(".destination-location-name");
    expect(destinationLocationName.text()).toBe("Gare d'autocars");
  });

  it("displays the operator info", () => {
    const wrapper = mount(
      <Departure
        origin_location={origin_location}
        origin_city={origin_city}
        destination_location={destination_location}
        destination_city={destination_city}
        operator={operator}
        departure_time={departure_time}
        arrival_time={arrival_time}
        prices={prices}
      />
    );

    const operatorName = wrapper.find(".operator-name");
    expect(operatorName.text()).toBe("Greyhound");
  });
});
