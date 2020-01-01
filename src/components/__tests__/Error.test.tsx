import React from "react";
import { render, cleanup } from "@testing-library/react";
import { IntlProvider } from "react-intl";

import Error from "./../Error";
import messages from "./../../i18n/messages/en.json";

afterEach(cleanup);

test("renders retry button", () => {
  const { getByText } = render(
    <IntlProvider locale="en" messages={messages}>
      <Error onRetry={() => {}} />
    </IntlProvider>
  );
  const retryButton = getByText(/retry/i);
  expect(retryButton).toBeInTheDocument();
});
