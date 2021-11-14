import React from "react";
import { render } from "../../test-utils";
import Button from "./Button";

describe("<Button />", () => {
  it("should render the button component", () => {
    const text = (Math.random() + 1).toString(36).substring(7);
    const { baseElement, getByText } = render(<Button>{text}</Button>);
    expect(baseElement).toBeTruthy();
    const button = getByText(text) as HTMLButtonElement;
    expect(button).toBeInTheDocument();
    expect(button.disabled).toBeFalsy();
  });

  it("should render the button component disabled", () => {
    const { getByText } = render(<Button disabled>Button disabled</Button>);
    const button = getByText(/button disabled/i) as HTMLButtonElement;
    expect(button.disabled).toBeTruthy();
  });
});
