import React from "react";
import { render } from "@testing-library/react";

import Container from "../";

describe("<Container />", () => {
  it("should render properly", () => {
    const { container } = render(<Container>content</Container>);

    expect(container).toMatchSnapshot();
  });
});
