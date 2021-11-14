import React from "react";
import { render } from "../../test-utils";
import Input from "./Input";

describe("<Input />", () => {
  it("should render input component", () => {
    const { baseElement } = render(<Input />);
    expect(baseElement).toBeTruthy();
  });
});
