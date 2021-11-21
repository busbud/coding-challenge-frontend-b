import { render } from "@testing-library/react";
import Form from "./Form";

describe("Search form", () => {
  test("display input fields", () => {
    const { getByLabelText } = render(<Form />);
    expect(getByLabelText(/departure/gi)).toBeInTheDocument();
    expect(getByLabelText(/arrival/gi)).toBeInTheDocument();
    expect(getByLabelText(/date/gi)).toBeInTheDocument();
    expect(getByLabelText(/passengers/gi)).toBeInTheDocument();
  });
});
