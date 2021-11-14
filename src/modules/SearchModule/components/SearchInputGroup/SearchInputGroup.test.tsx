import React from "react";
import { render } from "../../../../test-utils";
import SearchInputGroup from "./SearchInputGroup";

describe("<SearchInputGroup />", () => {
  it("should render the search input group component", () => {
    const onChange = jest.fn();
    const { baseElement } = render(
      <SearchInputGroup names={[]} value={{}} onChange={onChange} />
    );
    expect(baseElement).toBeTruthy();
    expect(baseElement.querySelectorAll("input")).toHaveLength(0);
    expect(onChange).not.toBeCalled();
  });
});
