import React from "react";
import { fireEvent, render } from "../../../../test-utils";
import Search from "./Search";

describe("<Search />", () => {
  it("should render the search component", () => {
    const { baseElement } = render(<Search />);
    expect(baseElement).toBeTruthy();
    expect(baseElement.querySelector('input[name="child"]')).toBeTruthy();
    expect(baseElement.querySelector('input[name="senior"]')).toBeTruthy();
    expect(baseElement.querySelector('input[name="adult"]')).toBeTruthy();
  });

  it("should update formData if we change the value and set 0 if we try to insert a negative value", () => {
    const { baseElement } = render(<Search />);
    const childInput = baseElement.querySelector(
      'input[name="child"]'
    ) as HTMLInputElement;
    expect(childInput).toHaveValue(0);
    fireEvent.change(childInput, { target: { value: 56 } });
    expect(childInput).toHaveValue(56);
    fireEvent.change(childInput, { target: { value: -6 } });
    expect(childInput).toHaveValue(0);
  });
});
