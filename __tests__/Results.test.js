import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import Results from "../components/Results";
import Departure from "../components/Departure";

import {
  cities,
  departures,
  locations,
  operators,
  selected_date
} from "../lib/testData";

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

describe("<Results />", () => {
  it("renders and matches the snapshot", () => {
    const wrapper = shallow(
      <Results
        cities={cities}
        locations={locations}
        departures={departures}
        operators={operators}
        selected_date={selected_date}
      />
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("displays the selected date in English", () => {
    const wrapper = shallow(
      <Results
        cities={cities}
        locations={locations}
        departures={departures}
        operators={operators}
        selected_date={selected_date}
      />
    );

    const selectedDate = wrapper.find("h2");
    expect(selectedDate.text()).toContain("Thursday 1st August 2019");
  });

  describe("when the language is set to FR", () => {
    it("displays the selected date in French", () => {
      const i18n = {
        language: "fr"
      };
      const wrapper = shallow(
        <Results
          cities={cities}
          locations={locations}
          departures={departures}
          operators={operators}
          selected_date={selected_date}
          i18n={i18n}
        />
      );

      const selectedDate = wrapper.find("h2");
      expect(selectedDate.text()).toContain("jeudi 1er août 2019");
    });
  });

  it("renders three <Departure /> components", () => {
    const wrapper = shallow(
      <Results
        cities={cities}
        locations={locations}
        departures={departures}
        operators={operators}
        selected_date={selected_date}
      />
    );
    expect(wrapper.find(Departure).length).toBe(3);
    wrapper.find(Departure).forEach(departure => {
      const departureProps = departure.props();
      const matchingDeparture = departures.find(
        departure => departure.id === departureProps.id
      );
      expect(departureProps.departure_time).toBe(
        matchingDeparture.departure_time
      );
    });
  });
});
