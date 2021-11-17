import React from "react";
import UpdateButton from ".";
import { render, fireEvent } from "../../test-utils";

describe("<UpdateButton />", () => {
  it("should render the UpdateButton component", () => {
    const { baseElement } = render(<UpdateButton />);
    expect(baseElement).toBeTruthy();
    const button = baseElement.querySelector<HTMLButtonElement>("button");
    expect(button).not.toBeDisabled();
  });

  it("should call onClick props if we click on the button", () => {
    const onClick = jest.fn();
    const { getByText } = render(<UpdateButton onClick={onClick} />);
    fireEvent.click(getByText(/update/i));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("should button be disabled if loading equal true", () => {
    const { baseElement } = render(<UpdateButton loading />);
    const button = baseElement.querySelector<HTMLButtonElement>("button");
    expect(button).toBeDisabled();
  });
});
