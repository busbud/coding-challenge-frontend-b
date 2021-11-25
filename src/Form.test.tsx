import { render, fireEvent, waitFor } from "@testing-library/react";
import formatISO from "date-fns/formatISO";
import Form from "./Form";

jest.unmock("@mui/material/Autocomplete");

describe("Search form", () => {
  const onSubmit = jest.fn();

  test("display input fields", () => {
    const { getByLabelText, getByText } = render(<Form onSubmit={onSubmit} />);
    expect(getByLabelText(/origin/i)).toBeInTheDocument();
    expect(getByLabelText(/destination/i)).toBeInTheDocument();
    expect(getByLabelText(/date/i)).toBeInTheDocument();
    expect(getByLabelText(/passengers/i)).toBeInTheDocument();
    expect(getByText(/search/i)).toBeInTheDocument();
  });

  test("submit data", async () => {
    const { getByText, getByLabelText } = render(<Form onSubmit={onSubmit} />);
    const expectedDate = formatISO(new Date(), { representation: "date" });
    fireEvent.mouseDown(getByLabelText(/origin/i));
    await waitFor(() => {
      fireEvent.click(getByText(/montreal/i));
    });
    fireEvent.mouseDown(getByLabelText(/destination/i));
    await waitFor(() => {
      fireEvent.click(getByText(/quebec/i));
    });
    fireEvent.change(getByLabelText(/passengers/i), { target: { value: "2" } });
    fireEvent.click(getByText(/search/i));
    expect(onSubmit).toHaveBeenCalledWith({
      passengers: 2,
      date: expectedDate,
      origin: "f25dvk",
      destination: "f2m673",
    });
  });
});
