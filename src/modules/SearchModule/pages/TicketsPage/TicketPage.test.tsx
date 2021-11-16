import React from "react";
import { render } from "../../../../test-utils";
import TicketsPage from "./TicketsPage";

describe("<TicketPage />", () => {
  it("should render the TicketPage component correctly", () => {
    const { baseElement } = render(<TicketsPage />);
    expect(baseElement).toBeTruthy();
  });
});
