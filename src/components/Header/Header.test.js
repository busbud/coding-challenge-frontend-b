import { shallow } from "enzyme";
import React from "react";
import Header from "./Header";

it("expect to render Header component", () => {
  expect(shallow(<Header />).debug()).toMatchSnapshot();
});
