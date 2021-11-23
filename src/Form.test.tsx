import { render, fireEvent } from "@testing-library/react";
import Form from "./Form";

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

  test("submit data", () => {
    const { getByText } = render(<Form onSubmit={onSubmit} />);
    fireEvent.click(getByText(/search/i));
    expect(onSubmit).toHaveBeenCalled();
  });
});
