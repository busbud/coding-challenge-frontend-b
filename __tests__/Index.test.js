import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";
import mockAxios from "axios";

import { cities, departures, locations, operators } from "../lib/testData";

import NoResults from "../components/NoResults";
import Loading from "../components/Loading";
import Results from "../components/Results";
import Index from "../pages/index";

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

jest.mock("../components/Results");

describe("<Index />", () => {
  it("renders and matches the snapshot", () => {
    const wrapper = shallow(<Index />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("initially renders the <NoResults /> component", () => {
    const wrapper = shallow(<Index />);
    expect(wrapper.state("initialised")).toBe(false);
    expect(wrapper.containsMatchingElement(<NoResults />)).toBe(true);
  });

  describe("when a search has been initialised", () => {
    it("renders the <Loading /> component", () => {
      const wrapper = shallow(<Index />);
      wrapper.setState({ initialised: true });
      expect(wrapper.containsMatchingElement(<Loading />)).toBe(true);
    });
  });

  describe("when a search is performed", () => {
    it("performs an ajax request with correctly formatted arguments", () => {
      const wrapper = shallow(<Index />);
      wrapper.instance().fetchData("foo", "bar", new Date("August 1, 2019"));
      expect(mockAxios.get).toHaveBeenCalledWith(
        "https://api.example.com/x-departures/foo/bar/2019-08-01?adult=1&currency=CAD",
        {
          headers: {
            Accept:
              "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
            "X-Busbud-Token": "TESTTOKEN"
          }
        }
      );
    });
  });

  describe("when a polling search is performed", () => {
    it("performs an ajax request with correctly formatted arguments", () => {
      const wrapper = shallow(<Index />);
      wrapper.setState({
        departures: [{ id: 1 }, { id: 2 }]
      });
      wrapper
        .instance()
        .fetchData("foo", "bar", new Date("August 1, 2019"), true);
      expect(mockAxios.get).toHaveBeenCalledWith(
        "https://api.example.com/x-departures/foo/bar/2019-08-01/poll?adult=1&currency=CAD&index=2",
        {
          headers: {
            Accept:
              "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
            "X-Busbud-Token": "TESTTOKEN"
          }
        }
      );
    });
  });

  describe("after departure data has been fetched", () => {
    it("displays the <Results /> component", async () => {
      const wrapper = shallow(<Index />);
      wrapper.setState({ initialised: true });
      mockAxios.get.mockResolvedValueOnce({
        data: { cities, locations, departures, operators, complete: true }
      });
      await wrapper
        .instance()
        .fetchData("foo", "bar", new Date("August 1, 2019"));
      expect(wrapper.containsMatchingElement(<Results />)).toBe(true);
    });
  });
});
