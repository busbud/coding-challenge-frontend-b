import { shallow } from "enzyme";
import React from "react";
import Footer from "./Footer";

it("expect to render Footer component", () => {
  expect(shallow(<Footer />).debug()).toMatchSnapshot();
});
