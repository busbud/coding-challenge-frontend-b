import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("should render App component", () => {
  render(<App />);
  const linkElement = screen.getByText(/Travel to Osheaga/i);
  expect(linkElement).toBeInTheDocument();
});
