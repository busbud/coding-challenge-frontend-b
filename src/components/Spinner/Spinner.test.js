import { mount } from "enzyme";
import React from "react";
import Spinner from "./Spinner";

it("expect to render Spinner component", () => {
  const SpinnerComponent = mount(<Spinner />).debug();
  expect(SpinnerComponent).toMatchSnapshot();
});
