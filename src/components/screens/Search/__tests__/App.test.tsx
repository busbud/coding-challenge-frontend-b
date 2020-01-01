import React from "react";
import { render, cleanup } from "@testing-library/react";
import { IntlProvider } from "react-intl";

import Search from "../Search";
import messages from "../../../../i18n/messages/en.json";

afterEach(cleanup);

test("renders search link", () => {
  const { getByText } = render(
    <IntlProvider locale="en" messages={messages}>
      <Search />
    </IntlProvider>
  );
  const linkElement = getByText(/Search departures/i);
  expect(linkElement).toBeInTheDocument();
});
