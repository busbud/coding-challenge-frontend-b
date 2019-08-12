import { shallow } from "enzyme";
import React from "react";
import Result from "./Result";

it("expect to render Result component", () => {
  expect(shallow(<Result />).debug()).toMatchSnapshot();
});
