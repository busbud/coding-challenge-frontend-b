import React from "react";
import { mount, shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import Departure from "../components/Departure";

const __origin_city__ = {
  name: "New York"
};
const __origin_location__ = {
  name: "Port Authority"
};
const __destination_city__ = {
  name: "Montreal"
};
const __destination_location__ = {
  name: "Gare d'autocars"
};
const __operator__ = {
  name: "Greyhound"
};
const __departure_time__ = "2019-08-01T01:30:00";
const __arrival_time__ = "2019-08-01T08:30:00";
const __prices__ = {
  total: 5200,
  currency: "CAD"
};

describe("<Departure />", () => {
  it("renders and matches the snapshot", () => {
    const wrapper = shallow(
      <Departure
        origin_location={__origin_location__}
        origin_city={__origin_city__}
        destination_location={__destination_location__}
        destination_city={__destination_city__}
        operator={__operator__}
        departure_time={__departure_time__}
        arrival_time={__arrival_time__}
        prices={__prices__}
      />
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("displays the departure info", () => {
    const wrapper = mount(
      <Departure
        origin_location={__origin_location__}
        origin_city={__origin_city__}
        destination_location={__destination_location__}
        destination_city={__destination_city__}
        operator={__operator__}
        departure_time={__departure_time__}
        arrival_time={__arrival_time__}
        prices={__prices__}
      />
    );

    const departureTime = wrapper.find(".departure-time");
    expect(departureTime.text()).toEqual("01:30 AM");
    const arrivalTime = wrapper.find(".arrival-time");
    expect(arrivalTime.text()).toEqual("08:30 AM");
    const price = wrapper.find(".price");
    expect(price.text()).toEqual("$52.00 CAD");
  });

  it("displays the origin city and location info", () => {
    const wrapper = mount(
      <Departure
        origin_location={__origin_location__}
        origin_city={__origin_city__}
        destination_location={__destination_location__}
        destination_city={__destination_city__}
        operator={__operator__}
        departure_time={__departure_time__}
        arrival_time={__arrival_time__}
        prices={__prices__}
      />
    );

    const originCityName = wrapper.find(".origin-city-name");
    expect(originCityName.text()).toEqual("New York");
    const originLocationName = wrapper.find(".origin-location-name");
    expect(originLocationName.text()).toEqual("Port Authority");
  });

  it("displays the destination city and location info", () => {
    const wrapper = mount(
      <Departure
        origin_location={__origin_location__}
        origin_city={__origin_city__}
        destination_location={__destination_location__}
        destination_city={__destination_city__}
        operator={__operator__}
        departure_time={__departure_time__}
        arrival_time={__arrival_time__}
        prices={__prices__}
      />
    );

    const destinationCityName = wrapper.find(".destination-city-name");
    expect(destinationCityName.text()).toEqual("Montreal");
    const destinationLocationName = wrapper.find(".destination-location-name");
    expect(destinationLocationName.text()).toEqual("Gare d'autocars");
  });

  it("displays the operator info", () => {
    const wrapper = mount(
      <Departure
        origin_location={__origin_location__}
        origin_city={__origin_city__}
        destination_location={__destination_location__}
        destination_city={__destination_city__}
        operator={__operator__}
        departure_time={__departure_time__}
        arrival_time={__arrival_time__}
        prices={__prices__}
      />
    );

    const operatorName = wrapper.find(".operator-name");
    expect(operatorName.text()).toEqual("Greyhound");
  });
});
