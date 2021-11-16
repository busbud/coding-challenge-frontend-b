import React from "react";
import UpdateButton from ".";
import { render, fireEvent } from "../../test-utils";

describe("<UpdateButton />", () => {
  it("should render the UpdateButton component", () => {
    const { baseElement } = render(<UpdateButton onClick={jest.fn} />);
    expect(baseElement).toBeTruthy();
  });

  it("should call onClick props if we click on the button", () => {
    const onClick = jest.fn();
    const { getByText } = render(<UpdateButton onClick={onClick} />);
    fireEvent.click(getByText(/update/i));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
