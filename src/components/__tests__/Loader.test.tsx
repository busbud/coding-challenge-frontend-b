import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import Loader from "./../Loader";

afterEach(cleanup);

describe("Loader", () => {
  test("should display an image", () => {
    const { getByAltText } = render(<Loader />);
    expect(getByAltText("loader")).toBeInTheDocument();
  });
});
