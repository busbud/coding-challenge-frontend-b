import React from "react";
import { fireEvent } from "@testing-library/react";

import Header from "../index";
import { setupComponent } from "../../../utils/jestUtils";
import en from "../../../translations/en";

describe("Header component", () => {
  it("should render without throwing an error", function() {
    const { asFragment } = setupComponent(<Header title={en.siteName} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render title received in props", function() {
    const { getByTestId } = setupComponent(<Header title={en.siteName} />);
    expect(getByTestId("header-title")).toHaveTextContent(en.siteName);
  });

  it("should have all the required attributes for language selection", function() {
    const { getByTestId } = setupComponent(<Header title={en.siteName} />);
    expect(getByTestId("header-english")).toHaveAttribute("role");
    expect(getByTestId("header-english")).toHaveAttribute("title");

    expect(getByTestId("header-french")).toHaveAttribute("role");
    expect(getByTestId("header-french")).toHaveAttribute("title");
  });

  it("should call toggle language", async function() {
    const toggle = jest.fn();
    const { getByTestId } = setupComponent(
      <Header title={en.siteName} />,
      toggle
    );
    fireEvent.click(getByTestId("header-french"));
    expect(toggle).toHaveBeenCalled();

    fireEvent.click(getByTestId("header-english"));
    expect(toggle).toHaveBeenCalled();
  });
});
