import React from "react";
import { render, screen } from "@testing-library/react";
import Search from "./Search";

test("renders search container", () => {
  render(<Search message="search context" />);
  const search = screen.getByText(/search context/i);
  expect(search).toBeInTheDocument();
});
