import React from "react";
import { render } from "@testing-library/react";

import FakeLoader from "../";

describe("<FakeLoader />", () => {
  it("should render properly", () => {
    const { container } = render(<FakeLoader />);
    expect(container).toMatchSnapshot();
  });
});
