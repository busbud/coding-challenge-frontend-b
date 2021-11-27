import i18next from "i18next";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Header } from "./Header";

jest.mock("i18next", () => ({
  changeLanguage: jest.fn(),
}));

describe("Header", () => {
  test("display laguage selector", () => {
    const { getByText } = render(<Header />);
    expect(getByText("Language")).toBeInTheDocument();
    userEvent.click(getByText("Language"));
    expect(getByText("English")).toBeVisible();
    expect(getByText("Français")).toBeVisible();
  });

  test.each`
    language      | code
    ${"English"}  | ${"en"}
    ${"Français"} | ${"fr"}
  `("switch language to $language", ({ language, code }) => {
    const { getByText } = render(<Header />);
    userEvent.click(getByText("Language"));

    userEvent.click(getByText(language));
    expect(getByText(language)).not.toBeVisible();
    expect(i18next.changeLanguage).toHaveBeenCalledWith(code);
  });
});
