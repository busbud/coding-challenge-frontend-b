import React from "react";
import { render } from "../../test-utils";
import HomePage from "./HomePage";

describe("<HomePage />", () => {
  it("should render the home page", () => {
    const { baseElement } = render(<HomePage />);
    expect(baseElement).toBeTruthy();
  });
});
