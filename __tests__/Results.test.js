import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import Results from "../components/Results";

const __cities__ = [];
const __locations__ = [];
const __departures__ = [];
const __operators__ = [];
const __selected_date__ = new Date("August 1, 2019");

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
        cities={__cities__}
        locations={__locations__}
        departures={__departures__}
        operators={__operators__}
        selected_date={__selected_date__}
      />
    );
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("displays the selected date in English", () => {
    const wrapper = shallow(
      <Results
        cities={__cities__}
        locations={__locations__}
        departures={__departures__}
        operators={__operators__}
        selected_date={__selected_date__}
      />
    );

    const selectedDate = wrapper.find("h2");
    expect(selectedDate.text()).toContain("Thursday 1st August 2019");
  });

  it("displays the selected date in French", () => {
    const wrapper = shallow(
      <Results
        cities={__cities__}
        locations={__locations__}
        departures={__departures__}
        operators={__operators__}
        selected_date={__selected_date__}
        i18n={{ language: "fr" }}
      />
    );

    const selectedDate = wrapper.find("h2");
    expect(selectedDate.text()).toContain("jeudi 1er août 2019");
  });
});
