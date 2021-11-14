import React from "react";
import { render } from "../../test-utils";
import SearchModule from "./SearchModule";

describe("<SearchModule />", () => {
  it("should render the search module component", () => {
    const { baseElement } = render(<SearchModule />);
    expect(baseElement).toBeTruthy();
  });
});
