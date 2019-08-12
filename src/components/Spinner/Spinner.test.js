import { shallow } from "enzyme";
import React from "react";
import Spinner from "./Spinner";

it("expect to render Spinner component", () => {
  expect(shallow(<Spinner />).debug()).toMatchSnapshot();
});
