import { shallow } from "enzyme";
import React from "react";
import Navbar from "./Navbar";

it("expect to render Navbar component", () => {
  expect(shallow(<Navbar />).debug()).toMatchSnapshot();
});
