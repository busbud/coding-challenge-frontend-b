import { render, screen } from "@testing-library/react";
import Brand from "./Brand";

import logo from "../../logo.svg";

/* <img alt="some text" src="logo.svg" /> */
test("renders logo and alt text", async () => {
  render(<Brand logo={logo} logoAltText="some text" />);

  const altText = screen.getByAltText("some text");
  expect(altText).toBeInTheDocument();
  const logoImage = screen.getByRole("img");
  expect(logoImage).toBeInTheDocument();
  expect(logoImage).toHaveAttribute("src");
  expect(logoImage).toHaveAttribute("alt");
});
