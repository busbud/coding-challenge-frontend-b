import React from "react";
import { render } from "./test-utils";
import App from "./App";

test("should render App component", () => {
  const { baseElement } = render(<App />);
  expect(baseElement).toBeTruthy();
});
