import React from "react";
import { render } from "../../test-utils";
import Alert from "./Alert";

describe("<Alert />", () => {
  it("should render the Alert correctly", () => {
    const { baseElement, getByText, rerender } = render(
      <Alert variant="danger">test</Alert>
    );
    const alertElement = baseElement.querySelector(
      "div.Alert"
    ) as HTMLDivElement;
    expect(alertElement).toBeTruthy();
    expect(alertElement.classList).toContain("danger");
    expect(getByText("test")).toBeTruthy();
    rerender(<Alert variant="warning">test2</Alert>);
    expect(alertElement).toBeTruthy();
    expect(alertElement.classList).toContain("warning");
    expect(getByText("test2")).toBeTruthy();
  });
});
