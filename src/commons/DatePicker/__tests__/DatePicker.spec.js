import React from "react";
import { render } from "@testing-library/react";

import DatePicker from "../";

describe("<DatePicker />", () => {
  it("should render properly", () => {
    const { container } = render(<DatePicker />);

    expect(container).toMatchSnapshot();
  });
});
