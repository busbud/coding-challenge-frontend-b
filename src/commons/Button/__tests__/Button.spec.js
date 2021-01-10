import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Button from "../";

const mockedOnClick = jest.fn();

describe("<Button />", () => {
  it("should render properly", () => {
    const { container } = render(
      <Button onClick={mockedOnClick}>content</Button>
    );
    expect(container).toMatchSnapshot();
  });

  it("should render a submit button", () => {
    const { container } = render(
      <Button type="submit" onClick={mockedOnClick}>
        content
      </Button>
    );
    expect(container.querySelector('[type="submit"]')).toBeInTheDocument();
  });

  it("should trigger the onClick", () => {
    const { container } = render(
      <Button onClick={mockedOnClick}>content</Button>
    );
    const button = container.firstChild;

    fireEvent.click(button);

    expect(mockedOnClick).toHaveBeenCalled();
  });
});
