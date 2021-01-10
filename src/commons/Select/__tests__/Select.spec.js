import React from "react";
import { render } from "@testing-library/react";

import Select from "../";

const { Option } = Select;

describe("<Select />", () => {
  it("should render properly", () => {
    const { container } = render(
      <Select defaultValue="f25dvk">
        <Option value="f25dvk">Montréal</Option>
      </Select>
    );

    expect(container).toMatchSnapshot();
  });
});
