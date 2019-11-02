import * as React from "react";

import HomePage from "../index";
import { setupComponent } from "../../utils/jest";

describe("Home Page", () => {
  it("should render without throwing an error", function() {
    const { asFragment } = setupComponent(<HomePage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
