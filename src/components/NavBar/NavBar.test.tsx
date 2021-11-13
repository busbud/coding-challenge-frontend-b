import React from "react";
import { render } from "../../test-utils";
import NavBar from "./NavBar";

describe("<NavBar />", () => {
  it("should render NavBar correctly", () => {
    const { baseElement, getByText } = render(<NavBar />);
    expect(baseElement).toBeTruthy();

    const search = getByText(/Search/i);
    expect(search).toBeInTheDocument();
  });
});
