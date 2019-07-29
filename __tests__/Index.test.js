import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

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

describe("<Index />", () => {
  it("renders and matches the snapshot", () => {
    const wrapper = shallow(<Index />);
    // console.log(wrapper.debug());
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
